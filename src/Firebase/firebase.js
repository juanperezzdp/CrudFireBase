import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBrTKQpL0zIVDWSzszIFeoT-JU_6a2BSAg",
  authDomain: "crud-c7bb5.firebaseapp.com",
  projectId: "crud-c7bb5",
  storageBucket: "crud-c7bb5.appspot.com",
  messagingSenderId: "1085758356440",
  appId: "1:1085758356440:web:7a687b6489f2b50b5010ad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);