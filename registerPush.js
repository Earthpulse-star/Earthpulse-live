
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('✅ Service Worker registered with scope:', registration.scope);

        return registration.pushManager.getSubscription().then(function(subscription) {
          if (subscription) {
            console.log('📡 Already subscribed:', subscription);
            return subscription;
          }

          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: '<YOUR_PUBLIC_VAPID_KEY>'
          });
        });
      })
      .then(function (subscription) {
        console.log('🔐 Push Subscription:', JSON.stringify(subscription));
        // TODO: Send this subscription to Supabase or your backend
      })
      .catch(function (error) {
        console.error('❌ Service Worker registration or subscription failed:', error);
      });
  });
} else {
  console.warn('⚠️ Push messaging is not supported in this browser.');
}
