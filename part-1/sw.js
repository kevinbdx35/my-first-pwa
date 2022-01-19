const CAcHE_NAME = 'V1'

this.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CAcHE_NAME)
        .then(function(cache){
            console.log("opened cache");
            return cache.addAll([
                'index.html',
                'main.js',
                'style.css'
            ])
        })
    )
})