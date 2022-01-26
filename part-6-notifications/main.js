let pushButton = document.getElementById('notifyBtn');
let swRegistration = null;
let isSubscribed = false;
const applicationServerPublicKey = 'BDk7o7XR4Azxs1ysy1aOuVCEgRWJEO2xH-3kF_sEKARFJ_YelY8C81vnS7bcLOGPOH1E2Qtn6pcCBPd_PFoL1f8';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log("service worker and push is supported");

    navigator.serviceWorker.register('sw.js')
        .then(reg => {
            console.log('sw is registered', reg);
            swRegistration = reg;
            initializeUI();
        })
        .catch(err => {
            console.error(err);
        })
} else {
    console.error('push messaging is not supported');
    notifyBtn.textContent = 'push notification is not supported';
}

function initializeUI() {
    pushButton.addEventListener('click', () => {
        if (isSubscribed) {
            unsubscribeUser();
        } else {
            subscribeUser();
        }
    })

    swRegistration.pushManager.getSubscription()
    .then(sub => {
        isSubscribed = !(sub === null);

        if (isSubscribed) {
            console.log('user is subscribed');
        } else {
            console.log('user is not subscribed');
        }
    
        updateBtn();

    })
}

function updateBtn() {
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'push messaging blocked';
        return;
    }

    if (isSubscribed) {
        pushButton.textContent = 'disable push messaging';
    } else {
        pushButton.textContent = 'enable push messaging';
    }
}

function subscribeUser() {
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
    .then(sub => {
        console.log('user is subscirbed');
        isSubscribed = true;
        updateBtn();
    })
    .catch(err => {
        console.error('user sub failed', err);
        updateBtn();
    })
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(sub => {
        if (sub) {
            return sub.unsubscribe();
        }
    })
    .catch(err => {
        console.error('error unsubscribing', err);
    })
    .then(() => {
        console.log('user is unsubscribed');
        isSubscribed = false;
        updateBtn();
    })
}

document.getElementById('test').addEventListener('click', event => {
    navigator.serviceWorker.getRegistration()
    .then(reg => {
        const title = 'testing this notification';
        options = {
            body: 'this is the test body',
            icon: 'book.png'
        }
        reg.showNotification(title, options);
    })
})