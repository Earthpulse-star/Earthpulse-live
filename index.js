import { useEffect } from 'react';
import registerPush from '../lib/registerPush';

export default function HomePage() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerPush();
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🌍 Welcome to EarthPulse</h1>
      <p>Listening to planetary signals…</p>
    </div>
  );
}