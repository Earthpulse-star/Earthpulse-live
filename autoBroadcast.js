import axios from 'axios';

export async function broadcastAlert(event) {
  if (!event || !event.trigger_alarm) return;

  const title = `🌍 EarthPulse ${event.type.toUpperCase()} Warning`;
  const body = `📍 ${event.location} | Magnitude: ${event.magnitude || 'N/A'}\n🕒 Forecast: ${new Date(event.forecast_date).toUTCString()}`;

  try {
    const response = await axios.post('/api/send-push', { title, body });
    console.log('✅ Alert sent:', response.data);
  } catch (err) {
    console.error('❌ Failed to send alert:', err);
  }
}