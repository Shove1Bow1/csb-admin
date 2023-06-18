import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(
  firebaseConfig,
  "https://blockhone-d9932.asia-southeast1.firebasedatabase.app/ "
);

// Initialize Realtime Database and get a reference to the service
const dbthongke = getDatabase(
  app,
  "https://callspamblocker-91a96-default-rtdb.asia-southeast1.firebasedatabase.app/"
);

const database = getDatabase(app);
export { database, dbthongke };
