import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../../core/firestore.js';

const username = localStorage.getItem("username")
const profilesRef = collection(db, 'profiles')

export const saveProfile = async (profile) => {
    if (!username) {
      console.log("User not logged in");
      return false;
    }
  
    try {
      const existingProfileQuery = query(profilesRef, where('username', '==', username));
      const existingProfiles = await getDocs(existingProfileQuery);
  
      if (existingProfiles.docs.length > 0) {
        const profileToDelete = existingProfiles.docs[0];
        await deleteDoc(doc(profilesRef, profileToDelete.id));
      }
  
      profile.username = username;
      await addDoc(profilesRef, profile);
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  };

export const getProfile = async (username) => {
    const q = query(profilesRef, where('username', '==', username));
    try {
      const exist = await getDocs(q);
      return exist.docs.length > 0 ? exist.docs[0].data() : null;
    } catch (error) {
      console.error("Error checking if profile exists:", error);
      return null;
    }
  };