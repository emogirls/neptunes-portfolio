import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';
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

export function SpotifyPresence() {
  const { spotify } = useSpotify();
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyric, setCurrentLyric] = useState('');

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
      setCurrentLyric('');
      return;
    }
    const id = setInterval(() => {
      const sec = (Date.now() - startTime) / 1000;
      let active = '';
      for (const line of lyrics) {
        if (sec >= line.time) active = line.text;
        else break;
      }
      setCurrentLyric(active);
    }, 150); 
    return () => clearInterval(id);
  }, [startTime, lyrics]);

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

  // ── Listening ──────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4"
    >
      <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-white/10">
        <img src={spotify.album_art_url} alt={spotify.album} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse shrink-0" />
          <span className="text-[10px] font-medium tracking-widest uppercase text-white/40">Now playing</span>
        </div>
        <div className="font-semibold text-white/90 truncate text-sm" title={spotify.song}>
          {spotify.song}
        </div>
        <div className="text-xs text-white/50 truncate" title={spotify.artist}>
          {spotify.artist}
        </div>

        <div className="mt-1.5 min-h-[1.1rem] relative">
          <AnimatePresence mode="popLayout">
            {currentLyric && (
              <motion.div
                key={currentLyric}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-xs italic text-white/45 font-light truncate w-full"
              >
                {currentLyric}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
