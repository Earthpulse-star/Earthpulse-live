EarthPulse Push Notification System

Place these files as follows:
- sw.js → public/
- registerPush.js → src/lib/ or utils/
- sendPushNotification.js & broadcastEarthquake.js → pages/api/
- vapid_keys.txt → store securely, don't commit private key

Make sure to set these ENV variables in Vercel:
- VAPID_PUBLIC_KEY
- VAPID_PRIVATE_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_KEY
