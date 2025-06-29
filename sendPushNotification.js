
const webpush = require('web-push');

const vapidKeys = {
  publicKey: '<YOUR_PUBLIC_VAPID_KEY>',
  privateKey: '<YOUR_PRIVATE_VAPID_KEY>'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { subscription, title, body, url } = req.body;

  const payload = JSON.stringify({
    title: title || '🌍 EarthPulse Alert',
    body: body || 'Seismic event detected.',
    url: url || '/'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Push error:', error);
    res.status(500).json({ error: 'Push failed' });
  }
};
