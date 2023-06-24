import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA5lPKSG2xEmopAhfg9er58eXt_wwZq6bY",
    authDomain: "chatkaro-fe04c.firebaseapp.com",
    projectId: "chatkaro-fe04c",
    storageBucket: "chatkaro-fe04c.appspot.com",
    messagingSenderId: "440182938031",
    appId: "1:440182938031:web:c35e271112d42a08deb75a",
    measurementId: "G-MHBTRDM8QL"
  };

  firebase.initializeApp(firebaseConfig);

  const projectFirestore= firebase.firestore();
  const projectAuth= firebase.auth();
  const timestamp= firebase.firestore.Timestamp

  export {projectFirestore,projectAuth,timestamp};