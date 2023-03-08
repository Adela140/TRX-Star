const CACHE_NAME = "version-1";
const urlsToCache = [ "offline.html", "logo.png", "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" ];

const self = this;

// Installation of SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request) // if we cannot fetch because there is no internet, we display offline.html
            .catch(() => caches.match('offline.html'))       
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) { // keep only the specific files from cache versions we need
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});