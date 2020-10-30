import firebase from 'firebase';
import firebaseConfig from '../localConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export {
  firebaseApp,
  db,
};
