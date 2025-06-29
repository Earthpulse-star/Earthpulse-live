let alerts = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, body } = req.body;
    alerts.unshift({
      title,
      body,
      timestamp: Date.now()
    });
    res.status(200).json({ message: 'Logged' });
  } else if (req.method === 'GET') {
    res.status(200).json({ alerts });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}