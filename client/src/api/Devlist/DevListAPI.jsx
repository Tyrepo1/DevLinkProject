import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../core/firestore';

 export const getProfiles = async () => {
  try {
    const profileRef = collection(db, 'profiles');
    const querySnapshot = await getDocs(profileRef);

    const profilesData = querySnapshot.docs.map((doc) => doc.data());

    return profilesData;
  } catch (error) {
    console.error('Error getting profiles: ', error);
    throw error;
  }
}