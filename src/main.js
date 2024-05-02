import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuEb01oy7owCcpnKyZn3W3OeM1odqJt5Q",
  authDomain: "intelli-project-41d85.firebaseapp.com",
  projectId: "intelli-project-41d85",
  storageBucket: "intelli-project-41d85.appspot.com",
  messagingSenderId: "561814116676",
  appId: "1:561814116676:web:b1f05aff96165853ca5f11"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
const app = createApp(App);
app.use(router);
app.mount("#app");

