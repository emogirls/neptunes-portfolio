import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
  album: string;
}

interface LyricLine {
  time: number;
  text: string;
}

function parseLRC(lrc: string): LyricLine[] {
  const lines = lrc.split('\n');
  const parsed: LyricLine[] = [];
  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const millis = parseInt(match[3]) * (match[3].length === 2 ? 10 : 1);
      const time = minutes * 60 + seconds + millis / 1000;
      const text = match[4].trim();
      if (text) {
        parsed.push({ time, text });
      }
    }
  }
  return parsed;
}

export function SpotifyPresence() {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyric, setCurrentLyric] = useState<string>('');
  
  // Connect to Lanyard
  useEffect(() => {
    let ws: WebSocket;
    let heartbeat: ReturnType<typeof setInterval>;

    const connect = () => {
      ws = new WebSocket('wss://spotify.sinister.wtf/socket');

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        
        if (msg.op === 1) {
          ws.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "654019669543354409" }
          }));
          heartbeat = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, msg.d.heartbeat_interval);
        } else if (msg.op === 0 && (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE')) {
          const user = msg.t === 'INIT_STATE' ? (msg.d['654019669543354409'] || msg.d) : msg.d;
          if (user?.listening_to_spotify && user?.spotify) {
            setSpotify(user.spotify);
          } else if (user?.spotify) {
             // Fallback if listening_to_spotify is missing but spotify exists
             setSpotify(user.spotify);
          } else {
            setSpotify(null);
          }
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      clearInterval(heartbeat);
    };
  }, []);

  // Fetch lyrics
  useEffect(() => {
    if (!spotify) {
      setLyrics([]);
      return;
    }

    const fetchLyrics = async () => {
      try {
        const trackName = encodeURIComponent(spotify.song);
        const artistName = encodeURIComponent(spotify.artist.split(';')[0].trim()); // handle multiple artists
        
        const res = await fetch(`https://lrclib.net/api/search?track_name=${trackName}&artist_name=${artistName}`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const withLyrics = data.find((t: any) => t.syncedLyrics);
          if (withLyrics) {
            const parsed = parseLRC(withLyrics.syncedLyrics);
            setLyrics(parsed);
          } else {
            setLyrics([]);
          }
        } else {
          setLyrics([]);
        }
      } catch (error) {
        console.error("Failed to fetch lyrics", error);
      }
    };

    fetchLyrics();
  }, [spotify?.track_id]);

  // Update current lyric
  useEffect(() => {
    if (!spotify) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const progressMs = now - spotify.timestamps.start;
      const progressSec = progressMs / 1000;
      
      if (lyrics.length > 0) {
        let activeLyric = '';
        for (let i = 0; i < lyrics.length; i++) {
          if (progressSec >= lyrics[i].time) {
            activeLyric = lyrics[i].text;
          } else {
            break;
          }
        }
        setCurrentLyric(activeLyric);
      } else {
        setCurrentLyric('');
      }
    }, 200);

    return () => clearInterval(interval);
  }, [spotify, lyrics]);

  if (!spotify) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-ink border-sketch p-4 flex flex-col md:flex-row items-center gap-4 shadow-sketch opacity-80"
      >
        <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center shrink-0 border-2 border-dashed border-ink/20">
           <span className="text-xl opacity-50 grayscale">🎵</span>
        </div>
        <div className="text-center md:text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Spotify</div>
          <div className="font-medium text-ink/60">Not listening to anything right now</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-ink border-sketch-full p-4 flex flex-col md:flex-row items-center gap-4 shadow-sketch overflow-hidden group"
    >
      <div className="w-20 h-20 shrink-0 relative flex items-center justify-center">
        <img 
          src={spotify.album_art_url} 
          alt={spotify.album} 
          className="w-full h-full rounded-full animate-[spin_8s_linear_infinite]" 
        />
        <div className="absolute inset-0 rounded-full border-2 border-ink shadow-inner pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-paper rounded-full border-2 border-ink z-10"></div>
      </div>
      <div className="flex-1 min-w-0 text-center md:text-left flex flex-col justify-center">
        <div className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-1 flex items-center justify-center md:justify-start gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Listening right now
        </div>
        <div className="font-bold text-lg truncate leading-tight mb-1" title={spotify.song}>{spotify.song}</div>
        <div className="text-sm text-ink/70 truncate" title={spotify.artist}>by {spotify.artist}</div>
        
        <div className="min-h-[1.5rem] mt-2 flex items-center justify-center md:justify-start">
          <AnimatePresence mode="wait">
            {currentLyric ? (
              <motion.div
                key={currentLyric}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-handwriting italic text-amber-700 font-bold"
              >
                "{currentLyric}"
              </motion.div>
            ) : (
              <motion.div
                key="empty-lyric"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-ink/40 italic flex gap-1 items-center"
              >
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-ink/30 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-ink/30 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1 h-1 bg-ink/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
