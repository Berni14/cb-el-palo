self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('mi-cache').then(function(cache) {
            return cache.addAll([
                'index.html',
                'styles.css',
                'script.js',
                'icon.png'
            ]);
        })
    );
});
