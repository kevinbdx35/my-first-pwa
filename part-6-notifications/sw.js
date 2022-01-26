'use strict';

self.addEventListener('notificationclose', event => {
    console.log('closed');
})

self.addEventListener('notificationclick', event => {
    clients.openWindow('https://google.com');
})