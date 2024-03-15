import firebase from '../lib/firebase.js';
import { jwtDecode } from 'jwt-decode';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

class User {
	constructor(username, email, password, role) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	static async getAll() {
		const snapshot = await getDocs(collection(db, 'Users'));
		const users = [];
		snapshot.forEach(doc => {
			users.push({ id: doc.id, ...doc.data() });
		});
		return users;
	}

	static async getById(id) {
    try {
      const userRef = doc(db, 'Users', id);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

	static async getUserByToken(token) {
    try {
      const user = await jwtDecode(token)
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async save() {
    try {
      const userRef = collection(db, 'Users');
      const docRef = await addDoc(userRef, {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      });
  
      return docRef.id;
    } catch (error) {
      throw new Error('Error saving user: ' + error.message);
    }
  }

  async update(id) {
    try {
      const userRef = doc(db, 'Users', id);
      await updateDoc(userRef, {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role
      });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const userRef = doc(db, 'Users', id);
      await deleteDoc(userRef);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default User;
