import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getDataParams } from '../../core/DB';
import { VERIFY_OTP, baseurl } from '../configAPI';


export const loginUser = async (loginData) => {
    const firestore = getFirestore()

    try {
        const q = query(collection(firestore, 'users'), where('username', '==', loginData.name)); // Query to find a user by username
        const exist = await getDocs(q); // Execute the query
  
        if (exist.empty) {
          return {success: false, message: "User does not exist"}
        } else {
          const user = exist.docs[0].data(); // Get the user data from the query result
  
          if (user.password !== loginData.password) {
            return {success: false, message: "Incorrect password"}
          } else {
            const secret = user.secret;
            const totpCode = loginData.otp;
            const url = `${baseurl}${VERIFY_OTP}`;
            const response = await getDataParams(url, {secret: secret, totpCode: totpCode});
            if(response.success){
                return {success: true, message: "Valid OTP"}
                
            }else{
                return {success: false, message: "Invalid OTP"}
            }
            
          }
        }
      } catch (error) {
        console.error('Error logging in: ', error);
      }
}
