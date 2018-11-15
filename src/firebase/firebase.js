import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
    apiKey: 'AIzaSyCjgMvefIiKOgRjTXrTiGIUPSoVHqo5fQE',
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: "firebase-boatlaunch",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: "6821003494",
};

const devConfig = {
    apiKey: 'AIzaSyCjgMvefIiKOgRjTXrTiGIUPSoVHqo5fQE',
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: "firebase-boatlaunch",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: "6821003494",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
}