import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import {getMessaging} from 'firebase/messaging'
const firebaseConfig = {
  apiKey: "AIzaSyBB4FoIXiE_zih4jnWk5qSoztBHDMICMiU",
  authDomain: "student-manag-45b80.firebaseapp.com",
  projectId: "student-manag-45b80",
  storageBucket: "student-manag-45b80.appspot.com",
  messagingSenderId: "252475193802",
  appId: "1:252475193802:web:acf0034b57329dd5acb733"
};

export const app=initializeApp(firebaseConfig)  
export const firestore=getFirestore(app)
export const storage=getStorage(app)
export const auth=getAuth(app)
export const messaging=getMessaging(app)