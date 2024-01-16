import { collection, getDocs } from 'firebase/firestore';
import { db} from '../../core/firestore';

export function extractValues(arr) {
    return arr.map(obj => obj.skills);
}
export const getProfiles = async () => {
    try {
        const profileRef = collection(db, 'profiles');
        const querySnapshot = await getDocs(profileRef);

        const profilesData = querySnapshot.docs.map((doc) => {
            const { skills, languages, experienceLevel, educationLevel, jobType, workEnvironment, willingnessToRelocate } = doc.data();
            return { skills, languages, experienceLevel, educationLevel, jobType, workEnvironment, willingnessToRelocate};
        });

        return profilesData;
    } catch (error) {
        console.error('Error getting profiles: ', error);
        throw error;
    }
}