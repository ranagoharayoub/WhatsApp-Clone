import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCS3ZIJESKiUZCN3dFdlZPNVwI_Odzt2vk",
    authDomain: "whatsapp-clone-c7b6a.firebaseapp.com",
    projectId: "whatsapp-clone-c7b6a",
    storageBucket: "whatsapp-clone-c7b6a.appspot.com",
    messagingSenderId: "326715951577",
    appId: "1:326715951577:web:cc5063f90da4ee161431c8",
    measurementId: "G-J88CL40BR1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig); 

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider}
  export default db;