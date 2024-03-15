import firebase from '../lib/firebase.js';
import { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';

const db = getFirestore(firebase);
const storage = getStorage(firebase);

class Information {
  constructor(title, description, userId, date, image, informationType) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.date = date;
    this.image = image;
    this.informationType = informationType;
  }

  static async getAll() {
    const snapshot = await getDocs(collection(db, 'Information'));
    const information = [];
    snapshot.forEach(doc => {
      information.push({ id: doc.id, ...doc.data() });
    });
    return information;
  }

  static async getById(id) {
    try {
      const infoRef = doc(db, 'Information', id);
      const infoSnapshot = await getDoc(infoRef);
      if (infoSnapshot.exists()) {
        return { id: infoSnapshot.id, ...infoSnapshot.data() };
      } else {
        throw new Error('Information not found');
      }
    } catch (error) {
      throw new Error('Error fetching information: ' + error.message);
    }
  }

  async save() {
    try {
      const infoRef = collection(db, 'Information');
      const title_image = this.title.split(' ')[0].toLowerCase();
      const storageRef = ref(storage, title_image);
      await addDoc(infoRef, {
        title: this.title,
        description: this.description,
        userId: this.userId,
        date: this.date,
        image: title_image,
        informationType: this.informationType
      });
      await uploadString(storageRef, this.image, 'data_url')
    } catch (error) {
      throw new Error('Error saving information: ' + error.message);
    }
  }

  async update(id) {
    try {
      const infoRef = doc(db, 'Information', id);
      const dataToUpdate = {
        title: this.title,
        description: this.description,
        userId: this.userId,
        date: this.date,
        informationType: this.informationType
      };

      if (this.image) {
        const title_image = this.title.split(' ')[0].toLowerCase();
        const storageRef = ref(storage, title_image);
        dataToUpdate.image = title_image;
        await uploadString(storageRef, this.image, 'data_url');
      }

      await updateDoc(infoRef, dataToUpdate);
    } catch (error) {
      throw new Error('Error updating information: ' + error.message);
    }
  }

  static async delete(id) {
    try {
      const infoRef = doc(db, 'Information', id);
      await deleteDoc(infoRef);
    } catch (error) {
      throw new Error('Error deleting information: ' + error.message);
    }
  }
}

export default Information;
