import { useEffect } from 'react';
import { monitorForecastEvents } from '../lib/supabaseListener';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    monitorForecastEvents(); // Activate real-time forecast monitor
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
