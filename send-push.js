import webpush from 'web-push';

const vapidKeys = {
  publicKey: '<your-public-VAPID-key-goes-here>',
  privateKey: '<your-private-VAPID-private-key-goes-here>'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, body } = req.body;

    const payload = JSON.stringify({
      title,
      body,
    });

    const results = await Promise.all(
      subscriptions.map(sub =>
        webpush.sendNotification(sub, payload).catch(err => {
          console.error('Push failed', err);
        })
      )
    );

    res.status(200).json({ message: 'Push sent', results });
  } else if (req.method === 'GET') {
    res.status(200).json({ message: 'Send a POST to push' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}