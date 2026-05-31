import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SpotifyProvider } from './lib/SpotifyContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SpotifyProvider>
        <App />
      </SpotifyProvider>
    </BrowserRouter>
  </StrictMode>,
)
