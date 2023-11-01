import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCOxpe6dMDV_2_KsOEtQxNJaHl7M1-hJ4k",
    authDomain: "chat-gpt-3f329.firebaseapp.com",
    projectId: "chat-gpt-3f329",
    storageBucket: "chat-gpt-3f329.appspot.com",
    messagingSenderId: "544873905368",
    appId: "1:544873905368:web:947dcd7589da9ef89febad"
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };