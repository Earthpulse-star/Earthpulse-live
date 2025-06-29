import { useState } from 'react';

export default function SendAlertAdmin() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');

  async function sendAlert() {
    const res = await fetch('/api/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    });
    const json = await res.json();
    setStatus(json.message || 'Sent');
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Manual Alert Sender</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br /><br />
      <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} /><br /><br />
      <button onClick={sendAlert}>⚡ Send Alert</button>
      <p>{status}</p>
    </div>
  );
}