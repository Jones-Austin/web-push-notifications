const client = (() => {
    let serviceWorkerRegObj = undefined;
    const notificationbutton = document.getElementById("btn-notify")

    const showNotificationButton = () => {
        notificationbutton.style.display = "block"
    }

    const checkNotifSupport = () => {
        if (!("Notification" in window)) {
            return Promise.reject("Notification is not supported")
        }
        console.log("The browser supports notification")
        return Promise.resolve("ok")
    }

    const registerServiceWorker = () => {
        if (!("serviceWorker" in navigator)) {
            return Promise.reject("service worker is not available")
        }
        return navigator.serviceWorker.register("service_worker.js")
            .then(regObj => {
                console.log("service worker is registered")
                serviceWorkerRegObj = regObj;
            })
    }

    const requestNotificationPermission = () => {
        return Notification.requestPermission(status => {
            console.log("Notification permission status:", status)
        })
    }

    // how constructor is called 
    checkNotifSupport()
        .then(registerServiceWorker)
        .catch(err => console.error(err))
        .then(requestNotificationPermission)
})();
