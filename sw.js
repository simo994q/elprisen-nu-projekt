if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.error('service worker not registered', err))
}

const staticCacheName = 'site-static-v1.3'

const assets = [
    './',
    './index.html',
    './css/globals.css',
    './css/layout.css',
    './css/nav.css',
    './css/main.css',
    './css/overview.css',
    './css/history.css',
    './css/settings.css',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('Sent files to cache');
            cache.addAll(assets)
        })
    )
    console.log('Service Worker has been installed');
})

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