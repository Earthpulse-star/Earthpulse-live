export default async function registerPush() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: '<your-public-VAPID-key-goes-here>'
    });

    await fetch('/api/save-subscription', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Push registration failed:', error);
  }
}