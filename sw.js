if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.error('service worker not registered', err))
}

const staticCacheName = 'static-cache-v1.0'

const assets = [
    './',
    './index.html',
    './fallback.html',
    './css/globals.css',
    './css/layout.css',
    './css/nav.css',
    './css/main.css',
    './css/overview.css',
    './css/history.css',
    './css/settings.css'
]

// Installere cachen og sender filer
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Sent files to cache');
            cache.addAll(assets)
        })
    )
    console.log('Service Worker has been installed');
})

// Når man opdatere cache versionen bliver den gamle slettet
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            const filteredKeys = keys.filter(key => key !== staticCacheName)
            filteredKeys.map(key => {
                caches.delete(key)
            })
        })
    )
    console.log('Service Worker has been activated');
})

// Går til fallback hvis man ikke kan fetche
self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request).catch(() => {
        return caches.match('fallback.html')
    }))
})
