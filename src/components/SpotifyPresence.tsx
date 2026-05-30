import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X } from 'lucide-react';
import { useSpotify } from '../lib/SpotifyContext';

interface LyricLine {
  time: number;
  text: string;
}

function parseLRC(lrc: string): LyricLine[] {
  return lrc.split('\n').reduce<LyricLine[]>((acc, line) => {
    // Standard format matching
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const time =
        parseInt(match[1]) * 60 +
        parseInt(match[2]) +
        parseInt(match[3]) * (match[3].length === 2 ? 10 : 1) / 1000;
      const text = match[4].trim();
      if (text) acc.push({ time, text });
    }
    return acc;
  }, []);
}

function ProgressBar({ start, end }: { start?: number, end?: number }) {
  const [progress, setProgress] = useState(0);
  const [elapsedStr, setElapsedStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:00');

  useEffect(() => {
    if (!start || !end) return;
    const duration = end - start;
    const durM = Math.floor((duration / 1000) / 60);
    const durS = Math.floor((duration / 1000) % 60);
    setDurationStr(`${durM}:${durS.toString().padStart(2, '0')}`);

    const id = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.max(0, now - start);
      const prog = Math.min(100, (elapsed / duration) * 100);
      setProgress(prog);

      const elM = Math.floor((elapsed / 1000) / 60);
      const elS = Math.floor((elapsed / 1000) % 60);
      setElapsedStr(`${elM}:${elS.toString().padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(id);
  }, [start, end]);

  if (!start || !end) return null;

  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-white transition-all duration-1000 ease-linear rounded-full" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <div className="flex justify-between items-center text-[10px] font-medium text-white/40 tabular-nums">
        <span>{elapsedStr}</span>
        <span>{durationStr}</span>
      </div>
    </div>
  );
}

function LyricLineItem({ line, isActive, isPassed }: { line: string, isActive: boolean, isPassed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={`text-2xl md:text-4xl font-bold transition-all duration-500 leading-tight origin-left ${
        isActive
          ? 'text-white scale-100 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]'
          : isPassed
          ? 'text-white/20 scale-95'
          : 'text-white/10 scale-95'
      }`}
    >
      {line}
    </div>
  );
}

export function SpotifyPresence() {
  const { spotify } = useSpotify();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Lyrics fetch ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!spotify) { setLyrics([]); return; }
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://lrclib.net/api/search?track_name=${encodeURIComponent(spotify.song)}&artist_name=${encodeURIComponent(spotify.artist.split(';')[0].trim())}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        const hit = data?.find?.((t: { syncedLyrics?: string }) => t.syncedLyrics);
        setLyrics(hit ? parseLRC(hit.syncedLyrics) : []);
      } catch { 
        setLyrics([]);
      }
    })();
    return () => controller.abort();
  }, [spotify?.track_id]);

  // ── Active lyric ticker ────────────────────────────────────────────────
  const startTime = spotify?.timestamps?.start;

  useEffect(() => {
    if (!startTime || lyrics.length === 0) {
      setActiveLyricIndex(-1);
      return;
    }
    const id = setInterval(() => {
      const sec = (Date.now() - startTime) / 1000;
      let activeIdx = -1;
      for (let i = 0; i < lyrics.length; i++) {
        if (sec >= lyrics[i].time) activeIdx = i;
        else break;
      }
      setActiveLyricIndex(activeIdx);
    }, 150); 
    return () => clearInterval(id);
  }, [startTime, lyrics]);

  // Handle body scroll locking
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  // ── Not listening ──────────────────────────────────────────────────────
  if (!spotify) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 py-2 opacity-50"
      >
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
          <Music className="w-4 h-4 text-white/40" />
        </div>
        <div>
          <div className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-0.5">Listening to</div>
          <div className="text-sm text-white/40 font-light">Nothing playing</div>
        </div>
      </motion.div>
    );
  }

  const currentLyricText = activeLyricIndex >= 0 ? lyrics[activeLyricIndex].text : '';

  // ── Listening ──────────────────────────────────────────────────────────
  return (
    <>
      <motion.button
        layoutId="spotify-container"
        transition={{ layout: { duration: 0.4, type: "spring", bounce: 0 } }}
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-4 text-left group hover:bg-white/[0.04] p-2 -m-2 rounded-2xl transition-all cursor-pointer w-full focus:outline-none"
      >
        <motion.div layoutId="spotify-art-container" className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <motion.img layoutId="spotify-art" src={spotify.album_art_url} alt={spotify.album} className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.div layoutId="spotify-status-container" className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse shrink-0" />
            <motion.span layoutId="spotify-status-text" className="text-[10px] font-medium tracking-widest uppercase text-white/40">Now playing</motion.span>
          </motion.div>
          <motion.div layoutId="spotify-title" className="font-semibold text-white/90 truncate text-sm" title={spotify.song}>
            {spotify.song}
          </motion.div>
          <motion.div layoutId="spotify-artist" className="text-xs text-white/50 truncate" title={spotify.artist}>
            {spotify.artist}
          </motion.div>

          <div className="mt-1.5 min-h-[1.1rem] relative overflow-hidden w-full">
            <AnimatePresence mode="popLayout">
              {currentLyricText && !isExpanded && (
                <motion.div
                  key={currentLyricText}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs italic text-white/45 font-light truncate w-[90%]"
                >
                  {currentLyricText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {isExpanded && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 isolate">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
              onClick={() => setIsExpanded(false)}
            />
            
            <motion.div
              layoutId="spotify-container"
              transition={{ layout: { duration: 0.4, type: "spring", bounce: 0 } }}
              className="relative w-full max-w-6xl h-[85vh] md:h-[75vh] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 shadow-xl hover:bg-white/20 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Column (Music Player) */}
              <div className="w-full md:w-[420px] shrink-0 p-6 md:p-10 flex flex-col border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02]">
                <div className="flex flex-row md:flex-col gap-6 md:gap-0 items-center md:items-start">
                  <motion.div layoutId="spotify-art-container" className="relative w-24 h-24 md:w-full md:aspect-square md:h-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 md:mb-8 shrink-0">
                    <motion.img layoutId="spotify-art" src={spotify.album_art_url} alt={spotify.album} className="w-full h-full object-cover" />
                  </motion.div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <motion.div layoutId="spotify-status-container" className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                      <motion.span layoutId="spotify-status-text" className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-green-400/80">Spotify</motion.span>
                    </motion.div>
                    <motion.div layoutId="spotify-title" className="font-bold text-white text-xl md:text-3xl leading-tight mb-1 md:mb-2 line-clamp-2">
                      {spotify.song}
                    </motion.div>
                    <motion.div layoutId="spotify-artist" className="text-white/60 text-sm md:text-lg truncate">
                      {spotify.artist}
                    </motion.div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="mt-6 md:mt-auto pt-4 md:pt-6 border-t border-white/5 w-full"
                >
                  <ProgressBar start={spotify.timestamps?.start} end={spotify.timestamps?.end} />
                </motion.div>
              </div>

              {/* Right Column (Lyrics) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="flex-1 relative overflow-hidden bg-black/40 flex flex-col"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                
                <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-6 md:p-16 relative" id="lyrics-container">
                  <div className="h-[30vh]" /> {/* Padding top to center first lyric */}
                  
                  {lyrics.length > 0 ? (
                    <div className="flex flex-col gap-6 md:gap-10 pb-[40vh]">
                      {lyrics.map((line, idx) => (
                        <LyricLineItem
                          key={idx}
                          line={line.text}
                          isActive={idx === activeLyricIndex}
                          isPassed={idx < activeLyricIndex}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center -mt-[30vh] text-center pb-20 px-8">
                      <p className="text-white/30 text-xl font-light italic">
                        ask the artist to submit their lyrics :(
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
