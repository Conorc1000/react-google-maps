import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: AIzaSyCjgMvefIiKOgRjTXrTiGIUPSoVHqo5fQE,
    authDomain: YOUR_AUTH_DOMAIN,
    databaseURL: YOUR_DATABASE_URL,
    projectId: YOUR_PROJECT_ID,
    storageBucket: '',
    messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  };

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const auth = firebase.autho();

export {
    auth
}