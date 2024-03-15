import User from '../models/user.js';
import firebase from '../lib/firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore';

const db = getFirestore(firebase);
const auth = getAuth(firebase);

export const createUser = async (req, res) => {
	try {
    const { username, email, password, role } = req.body;

		const userSnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', email)));
		if (!userSnapshot.empty) {
			throw new Error('Email address is already in use');
		}

    const user = new User(username, email, password, role);
    const userId = await user.save();

		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const firebaseUid = userCredential.user.uid;

    await updateDoc(doc(db, 'Users', userId), { firebaseUid });
    res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const getAllUsers = async (_, res) => {
	try {
		const users = await User.getAll();
		res.status(200).json({ status: 'success', data: users });
	} catch (err) {
		res.status(500).json({ status: 'error', message: err.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.getById(userId);
		res.status(200).json({ status: 'success', data: user });
	} catch (err) {
		res.status(404).json({ status: 'fail', message: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;
		const userId = req.params.id;
		const user = new User(username, email, password, role);
		await user.update(userId);
		res.status(200).json({ status: 'success', message: 'User updated successfully' });
	} catch (err) {
		res.status(400).json({ status: 'fail', message: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = new User();
		const userId = req.params.id;
		await user.delete(userId);
		res.status(204).json({ status: 'success', message: 'User deleted successfully' });
	} catch (err) {
		res.status(400).json({ status: 'fail', message: err.message });
	}
};

export const getAllAdmin = async (_, res) => {
  try {
    const users = await User.getAll();
    const adminUsers = users.filter(user => user.role === 'superuser');
    res.status(200).json({ status: 'success', data: adminUsers });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

