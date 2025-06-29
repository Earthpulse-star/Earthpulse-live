import { useEffect, useState } from 'react';

export default function AlertsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      const res = await fetch('/api/alert-log');
      const data = await res.json();
      setLogs(data.alerts);
    }
    fetchAlerts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>⚡ EarthPulse Alert Log</h1>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <strong>🔔 {log.title}</strong><br />
            {log.body}<br />
            <small>{new Date(log.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}