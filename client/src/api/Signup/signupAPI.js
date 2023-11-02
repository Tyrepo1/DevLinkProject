import { addDoc, collection, getDocs, query, where, getFirestore } from "firebase/firestore";
import { getDataParams } from "../../core/DB";
import { db } from '../../core/firestore';
import { GET_OTP, baseurl } from "../configAPI";

const firestore = getFirestore();

export const saveUser = async (data) => {
    try {
        // Check if username is unique
        const q = query(collection(firestore, 'users'), where('usernameLower', '==', data.name.toLowerCase())); 
        const exist = await getDocs(q); 

        if (!exist.empty) {
            console.log("User already exists");
            return null;
        }

        const account = {
            email: data.email,
            username: data.name,
            password: data.password,
            secret: '',
            usernameLower: data.name.toLowerCase(),
        };

        // Fetch the OTP data from the API
        const url = `${baseurl}${GET_OTP}`;
        const response = await getDataParams(url, {username: account.username});
        const { totpKey, qrCodeUrl } = response;
        account.secret = totpKey;

        // Save the user data to Firestore
        const docRef = await addDoc(collection(db, 'users'), account);

        // Handle success 
        console.log('User added successfully');
        console.log('Document reference:', docRef);

        return qrCodeUrl;
    } catch (error) {
        // Handle errors (log details for debugging)
        console.error('Error adding document:', error);
        throw error; // Rethrow the error for higher-level error handling
    }
};
