self.addEventListener('push', function (event) {
  const data = event.data.json();
  const title = data.title || "EarthPulse Alert";
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});