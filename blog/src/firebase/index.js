// import 'firebase/compat/auth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyD3_F8vPHpK17Wb_SUVn3eK6FlPJVclzoY",
//   authDomain: "traveldiaries-8f7ee.firebaseapp.com",
//   projectId: "traveldiaries-8f7ee",
//   storageBucket: "traveldiaries-8f7ee.appspot.com",
//   messagingSenderId: "782343480075",
//   appId: "1:782343480075:web:e689718a85e551ceb1380e",
//   measurementId: "G-Z82E1WE09S"
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }else {
//   firebase.app(); // if already initialized, use that one
// }


// const storage = firebase.storage();

// export { storage, firebase as default };

// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3_F8vPHpK17Wb_SUVn3eK6FlPJVclzoY",
  authDomain: "traveldiaries-8f7ee.firebaseapp.com",
  projectId: "traveldiaries-8f7ee",
  storageBucket: "traveldiaries-8f7ee.appspot.com",
  messagingSenderId: "782343480075",
  appId: "1:782343480075:web:e689718a85e551ceb1380e",
  measurementId: "G-Z82E1WE09S"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
// const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
//const analytics = getAnalytics(app);

const storage = firebase.storage().ref();

export { storage, firebase as default };
