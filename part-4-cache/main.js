if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
        console.log('service worker registration successful');
    })
    .catch(err => {
        console.error('service worker registrat failed', err);
    })
}