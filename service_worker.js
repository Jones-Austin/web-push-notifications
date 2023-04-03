self.addEventListener("notifictionclose", event => {
    console.log("Notification was closed", event);
});

self.addEventListener("notifictionclick", event => {
    if (event.action === "search") {
        const githubuser = event.notification.data.githubUser;
        clients.openWindow(`https://github.com/${githubuser}`);
    } else if (event.action === "close") {
        clients.openWindow(`https://pointpark.edu`);
    }
    console.log("Notification clicked", event.notification.data);
});