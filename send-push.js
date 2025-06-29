import webpush from 'web-push';

const vapidKeys = {
  publicKey: '<BJVjxAn2hB42xV1BYpKLrfaBLX44B0TXo9Jt2V0lpSVktYIsoXcv7zTbbzxig_qQkK1o5JAu0klFqE0tOa3Ze4U>',
  privateKey: '<Bc721g1JcOs0T0TSVwM74tXv9DfzAqYbc-FqIG0nmdo>'
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
