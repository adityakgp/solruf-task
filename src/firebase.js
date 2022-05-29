import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const db = getFirestore(app);
export const auth = app.auth()
export const storage = getStorage(app);
// export const UpdateProfile = updateProfile(app)
// // export const storage = getStorage(app);
// export const DownloadURL = getDownloadURL(app)
// export const Storage = getStorage(app)
// export const Ref = ref(app)
// export const UploadBytes = uploadBytes(app)
export default app