  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js"
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCgDMzpH5MK6bdw9vsD40OtA41iBbK6koY",
    authDomain: "projeto-mundo-invertido-cc0fc.firebaseapp.com",
    projectId: "projeto-mundo-invertido-cc0fc",
    storageBucket: "projeto-mundo-invertido-cc0fc.appspot.com",
    messagingSenderId: "1011077599729",
    appId: "1:1011077599729:web:52874200d91c956492b450",
    measurementId: "G-PPVZENNV8X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  //const analytics = getAnalytics(app);

  export default app
