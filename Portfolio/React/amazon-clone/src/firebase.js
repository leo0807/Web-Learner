import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDPOBk_4mghFhZR2jQCQsSPmfdtJrKrWJw",
  authDomain: "clone-8e77f.firebaseapp.com",
  projectId: "clone-8e77f",
  storageBucket: "clone-8e77f.appspot.com",
  messagingSenderId: "393267141769",
  appId: "1:393267141769:web:26b3afdd8bd9312a8a7a58"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };