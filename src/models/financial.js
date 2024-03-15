import firebase from '../lib/firebase.js';
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

class Financial {
  constructor(title, description, amount, date, userId) {
    this.title = title;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.userId = userId
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'Financial'));
    const financials = [];
    snapshot.forEach(doc => {
      financials.push({ id: doc.id, ...doc.data() });
    });
    return financials;
  }

  static async getById(id) {
    const financialRef = doc(db, 'Financial', id);
    const financialSnapshot = await getDoc(financialRef);
    if (financialSnapshot.exists()) {
      return { id: financialSnapshot.id, ...financialSnapshot.data() };
    } else {
      throw new Error('Financial information not found');
    }
  }

  async save() {
    try {
      const financialRef = collection(db, 'Financial');
      await addDoc(financialRef, {
        title: this.title,
        description: this.description,
        amount: this.amount,
        date: this.date,
        userId: this.userId
      });
    } catch (error) {
      throw new Error('Error saving financial information: ' + error.message);
    }
  }

  async update(id) {
    try {
      const financialRef = doc(db, 'Financial', id);
      await updateDoc(financialRef, {
        title: this.title,
        description: this.description,
        amount: this.amount,
        date: this.date,
        userId: this.userId
      });
    } catch (error) {
      throw new Error('Error updating financial information: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const financialRef = doc(db, 'Financial', id);
      await deleteDoc(financialRef);
    } catch (error) {
      throw new Error('Error deleting financial information: ' + error.message);
    }
  }
}

export default Financial;
