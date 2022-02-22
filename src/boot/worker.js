import { register } from "register-service-worker";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { initializeApp } from "firebase/app";
import Vue from "vue";
const firebaseConfig = {
  apiKey: "AIzaSyDyP34EdIfpjK_3sTJQgTrldh_YG50wEf0",
  authDomain: "rasello-209003.firebaseapp.com",
  projectId: "rasello-209003",
  storageBucket: "rasello-209003.appspot.com",
  messagingSenderId: "1041548974398",
  appId: "1:1041548974398:web:6a1a27922d4065af9d746f",
};

// export default async({app, router, store, Vue}) =>{
Vue.prototype.$messaging = null;
register("fcm.sw.js", {
  async ready(registration) {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    const tokenOptions = {
      serviceWorkerRegistration: registration,
      vapidKey:
        "BDJxqbkUEWHLXdOXxX-WGuqMbdFJfqYxSQGt8gG9EpWHUpPR9iYCXktS6OdfhU84F0dbxfbimorrueznhDXuXJE",
    };
    Vue.prototype.$messaging = messaging;

    console.log("OIs supportex", await isSupported());
    try {
      let token = await getToken(messaging, tokenOptions);
      console.log("Token of fcm is-", token);
    } catch (error) {
      console.log("Eror on firebase startion ", error);
    }
    onMessage(
      {
        app: firebaseApp,
      },
      (payload) => {
        console.log("foreground notification received", payload);
      }
    );
  },

  registered(registration) {},

  cached(registration) {
    console.log("Content has been cached for offline use.");
  },

  updatefound(registration) {
    console.log("New content is downloading.");
  },

  updated(registration) {
    console.log("New content is available; please refresh.");
  },

  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },

  error(error) {
    console.error("Error during service worker registration:", error);
  },
});

// }
