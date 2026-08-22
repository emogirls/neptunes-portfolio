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
    let isMounted = true;
    const DISCORD_USER_ID = '654019669543354409';

    const fetchPresence = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        if (!response.ok) return;
        const json = await response.json();
        if (isMounted && json.success) {
          setSpotify(json.data?.spotify ?? null);
        }
      } catch (err) {
        console.error('Failed to fetch Lanyard Spotify presence:', err);
      }
    };

    fetchPresence();
    const interval = setInterval(fetchPresence, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <SpotifyContext.Provider value={{ spotify }}>
      {children}
    </SpotifyContext.Provider>
  );
}

export const useSpotify = () => useContext(SpotifyContext);
