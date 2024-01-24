import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from '../../core/firestore.js';
import { storage } from '../../core/firestore.js';
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";

const username = localStorage.getItem("username")
const profilesRef = collection(db, 'profiles')

export const saveProfile = async (profile) => {
    console.log("Saving profile: " + JSON.stringify(profile))
    if (!username) {
      console.log("User not logged in");
      return false;
    }
  
    try {
      debugger;
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

export const resizePngImage = (base64String) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const maxWidth = 80;
        const maxHeight = 60;
  
        const aspectRatio = img.width / img.height;
        let newWidth = maxWidth;
        let newHeight = newWidth / aspectRatio;
  
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }
  
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        const resizedBase64String = canvas.toDataURL('image/png');
  
        resolve(resizedBase64String);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  }
  export const uploadPdfToFirestore = async (pdfFile) => {
    try {
      const storageRef = ref(storage, 'resumes/' + pdfFile.name);
  
      const snapshot = await uploadBytes(storageRef, pdfFile);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      console.log('Uploaded a PDF file:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading PDF file:', error);
      throw error;
    }
  };
  
  
  
  