import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL2U-h6MRkwQLYH7X973xDhNIuXxRPZtc",
  authDomain: "hotel-booking-app-cb3f7.firebaseapp.com",
  projectId: "hotel-booking-app-cb3f7",
  storageBucket: "hotel-booking-app-cb3f7.appspot.com",
  messagingSenderId: "182339364430",
  appId: "1:182339364430:web:5073e47b54958ac347851f",
  measurementId: "G-2HPC1WKR84",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
