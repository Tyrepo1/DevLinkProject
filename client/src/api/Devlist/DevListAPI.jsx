import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { db
 } from '../../core/firestore';

 export const getProfiles = async () => {
  try {
    const profilesCollection = collection(db, 'userProfiles');

    const querySnapshot = await getDocs(profilesCollection);

    const profiles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return profiles;
  } catch (error) {
    console.error('Error getting profiles: ', error);
    throw error;
  }
}