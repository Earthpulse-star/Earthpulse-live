let subscriptions = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const subscription = req.body;
    subscriptions.push(subscription);
    console.log('Subscription saved:', subscription);
    res.status(201).json({ message: 'Subscription saved' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}