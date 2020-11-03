import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'denis-portfolio.firebaseapp.com',
  databaseURL: 'https://denis-portfolio.firebaseio.com',
  projectId: 'denis-portfolio',
  storageBucket: 'denis-portfolio.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export {
  firebaseApp,
  db,
};
