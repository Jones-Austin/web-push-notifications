const client = (() => {
    let serviceWorkerRegObj = undefined;
    const notificationbutton = document.getElementById("btn-notify");
  
    const showNotificationButton = () => {
      notificationbutton.style.display = "block";
      notificationbutton.addEventListener("click", customshowNotification);
    };
  
    const customshowNotification = () => {
        console.log("showing notification");
        const options = {
          body: "This is the body of the notification",
          icon: "/images/Tesla_logo.png"
        };
        actions =  [
          { action: "search", title: "Search PPU"},
          { action: "close", title: "Nevermind"},
        ];
        data = [
            {notificationTime: Date.now()},
           { githubuser: "jones-austin"},
        ];
        options.actions = actions;
        options.data = data;

      navigator.serviceWorker.getRegistration()
        .then(registration => {
          registration.showNotification("Sping seastmer is almost out!", options);
        });
    };
  
    const checkNotifSupport = () => {
      if (!("Notification" in window)) {
        return Promise.reject("Notification is not supported");
      }
      console.log("The browser supports notifications");
      return Promise.resolve("ok");
    };
  
    const registerServiceWorker = () => {
      if (!("serviceWorker" in navigator)) {
        return Promise.reject("Service worker is not available");
      }
      return navigator.serviceWorker.register("service_worker.js")
        .then(regObj => {
          console.log("Service worker is registered");
          serviceWorkerRegObj = regObj;
        });
    };
  
    const requestNotificationPermission = () => {
      return Notification.requestPermission()
        .then(status => {
          console.log("Notification permission status:", status);
        });
    };
  
    // how constructor is called 
    checkNotifSupport()
      .then(registerServiceWorker)
      .catch(err => console.error(err))
      .then(() => {
        showNotificationButton();
        requestNotificationPermission();
      });
  })();
  