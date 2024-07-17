import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7y5eoZdzfXpzxYmV7VfYTrafRoxQzhjU",
  authDomain: "prtest-5aaeb.firebaseapp.com",
  projectId: "prtest-5aaeb",
  storageBucket: "prtest-5aaeb.appspot.com",
  messagingSenderId: "325451265802",
  appId: "1:325451265802:web:e460e57d911749ac20acf3",
  measurementId: "G-R9RSYEKKXC",
  storageBucket:"gs://prtest-5aaeb.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);//export
const txtDB = getFirestore(app);//
export {storage, txtDB};//
const analytics = getAnalytics(app);

export const databases = getDatabase(app);
export const database = getAuth(app);