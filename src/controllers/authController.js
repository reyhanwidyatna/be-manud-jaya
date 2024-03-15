import firebase from '../lib/firebase.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth(firebase);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    res.status(200).json({ status: 'success', message: 'User logged in successfully', token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const logoutUser = async (_, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ status: 'success', message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
