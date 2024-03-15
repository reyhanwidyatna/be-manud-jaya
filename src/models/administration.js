import firebase from '../lib/firebase.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(firebase);

class Administration {
  constructor(title, serviceType, serviceCategory, userId, adminId, schedule, status) {
    this.title = title;
    this.serviceType = serviceType;
    this.serviceCategory = serviceCategory;
    this.userId = userId;
    this.adminId = adminId;
    this.schedule = schedule;
    this.status = status;
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'Administration'));
    const administrations = [];
    snapshot.forEach(doc => {
      administrations.push({ id: doc.id, ...doc.data() });
    });
    return administrations;
  }

  static async getById(id) {
    try {
      const adminRef = doc(db, 'Administration', id);
      const adminSnapshot = await getDoc(adminRef);
      if (adminSnapshot.exists()) {
        return { id: adminSnapshot.id, ...adminSnapshot.data() };
      } else {
        throw new Error('Administration not found');
      }
    } catch (error) {
      throw new Error('Error fetching administration: ' + error.message);
    }
  }

  async save() {
    try {
      const adminRef = collection(db, 'Administration');
      await addDoc(adminRef, {
        title: this.title,
        serviceType: this.serviceType,
        serviceCategory: this.serviceCategory,
        userId: this.userId,
        adminId: this.adminId,
        schedule: this.schedule,
        status: this.status
      });
    } catch (error) {
      throw new Error('Error saving administration: ' + error.message);
    }
  }

  async update(id) {
    try {
      const adminRef = doc(db, 'Administration', id);
      await updateDoc(adminRef, {
        title: this.title,
        serviceType: this.serviceType,
        serviceCategory: this.serviceCategory,
        userId: this.userId,
        adminId: this.adminId,
        schedule: this.schedule,
        status: this.status
      });
    } catch (error) {
      throw new Error('Error updating administration: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const adminRef = doc(db, 'Administration', id);
      await deleteDoc(adminRef);
    } catch (error) {
      throw new Error('Error deleting administration: ' + error.message);
    }
  }
}

export default Administration;
