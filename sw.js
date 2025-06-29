
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "🌍 EarthPulse Alert";
  const options = {
    body: data.body || "Seismic shift detected. Stay aware.",
    icon: "/earthpulse-icon.png",
    badge: "/earthpulse-icon.png",
    vibrate: [200, 100, 200],
    sound: "/chime.mp3",
    data: { url: data.url || "/" }
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
