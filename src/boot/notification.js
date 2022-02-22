Notification.requestPermission((status) => {
  console.log("Notification permission status:", status);
});
function displayNotification() {
  if (Notification.permission == "granted") {
    new Notification("To do list", { body: ".." });
  }
}
displayNotification();
