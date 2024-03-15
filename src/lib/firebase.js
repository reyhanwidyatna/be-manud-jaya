import config from '../config.js';
import { initializeApp } from 'firebase/app';

const firebase = initializeApp(config.firebaseConfig);

export default firebase;
