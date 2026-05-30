import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album_art_url: string;
  timestamps: { start: number; end: number };
  album: string;
}

interface SpotifyContextType {
  spotify: SpotifyData | null;
}

const SpotifyContext = createContext<SpotifyContextType>({ spotify: null });

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeat: ReturnType<typeof setInterval>;

    const connect = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.op === 1) {
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: '654019669543354409' } }));
          heartbeat = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        } else if (msg.op === 0 && (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE')) {
          const user = msg.t === 'INIT_STATE' ? (msg.d['654019669543354409'] || msg.d) : msg.d;
          setSpotify(user?.spotify ?? null);
        }
      };
      ws.onclose = () => { clearInterval(heartbeat); setTimeout(connect, 5000); };
    };

    connect();
    return () => { ws?.close(); clearInterval(heartbeat); };
  }, []);

  return (
    <SpotifyContext.Provider value={{ spotify }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export const useSpotify = () => useContext(SpotifyContext);
