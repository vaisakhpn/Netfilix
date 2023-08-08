import firebase from 'firebase';
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA00_BIA3qocg_6r4SNSm2DFXi_2ydwWQI",
  authDomain: "netflix-d7eaf.firebaseapp.com",
  projectId: "netflix-d7eaf",
  storageBucket: "netflix-d7eaf.appspot.com",
  messagingSenderId: "578824406976",
  appId: "1:578824406976:web:010c0f131492c45584ea25",
  measurementId: "G-X0JBE6BXGP"
};
  
export default firebase.initializeApp(firebaseConfig)