// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const manifest = self.__WB_MANIFEST;
const firebaseConfig = {
  apiKey: "AIzaSyDyP34EdIfpjK_3sTJQgTrldh_YG50wEf0",
  authDomain: "rasello-209003.firebaseapp.com",
  projectId: "rasello-209003",
  storageBucket: "rasello-209003.appspot.com",
  messagingSenderId: "1041548974398",
  appId: "1:1041548974398:web:6a1a27922d4065af9d746f",
};

const firebasApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebasApp);

onBackgroundMessage(messaging, function (payload) {
  // TODO: logo here.
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: notificationTitle,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
