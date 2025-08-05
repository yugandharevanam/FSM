// Clear cache and reload service worker
if ('serviceWorker' in navigator) {
  // Unregister old service worker
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
  
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  
  // Reload page to register new service worker
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} 