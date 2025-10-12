// import 'firebase/compat/auth';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import "firebase/compat/storage";

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

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
// Dev-only: log bucket and project to confirm env values are applied (no secrets logged)
if (process.env.NODE_ENV === 'development') {
  try {
    const opts = firebase.app().options || {};
    // eslint-disable-next-line no-console
    console.log('Firebase config (dev):', { storageBucket: opts.storageBucket, projectId: opts.projectId });
  } catch (_) {}
}
// Auth is optional; many dev setups use public Storage rules.
// To avoid errors when API key/domains are restricted, we do not initialize Auth by default.
// If you require auth, enable it and initialize here.
const authReady = Promise.resolve(null);

const storage = firebase.storage();
const bucketName = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
export function getStorageRef(path) {
  try {
    if (bucketName) {
      return storage.refFromURL(`gs://${bucketName}`).child(path || "");
    }
  } catch (_) {}
  return storage.ref(path || "");
}

export { storage, authReady, firebase as default };
