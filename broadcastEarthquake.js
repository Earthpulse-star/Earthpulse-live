
import { createClient } from '@supabase/supabase-js';
import webpush from 'web-push';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, body, url } = req.body;

  const { data: subscriptions, error } = await supabase.from('user_subscriptions').select('subscription');

  if (error) return res.status(500).json({ error });

  const payload = JSON.stringify({ title, body, url });

  const results = await Promise.all(subscriptions.map(async ({ subscription }) => {
    try {
      await webpush.sendNotification(subscription, payload);
      return { success: true };
    } catch (err) {
      console.error('Push failed for one subscription:', err);
      return { success: false };
    }
  }));

  res.status(200).json({ delivered: results.filter(r => r.success).length });
}
