import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { getDataParams } from '../../core/DB';
import { baseurl, EMAIL_VERIFY } from '../configAPI';


export const findUser = async (nameAndEmail) => {
  const firestore = getFirestore();

  try {
    const q1 = query(collection(firestore, 'users'), where('username', '==', nameAndEmail));
    const existUsername = await getDocs(q1);

    if (existUsername.empty) {
      return { success: false, email: false, message: "User does not exist" };
    } else {
      const userDoc = existUsername.docs[0];
      const user = userDoc.data();
    if(user.secret == ""){
      const url = `${baseurl}${EMAIL_VERIFY}`;
      getDataParams(url, { username: user.username, email: user.email });
      return { success: true, email: true, message: user.username };
    }
    return { success: true, email: false, message: user.username };
      
    }
  } catch (error) {
    console.error('Error getting OTP: ', error);
  }
}
