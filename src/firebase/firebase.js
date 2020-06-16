import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain: "boatlaunch.firebaseapp.com",
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: 'firebase-boatlaunch',
    storageBucket: "firebase-boatlaunch.appspot.com",
    messagingSenderId: "6821003494",
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
  auth,
  database,
}
