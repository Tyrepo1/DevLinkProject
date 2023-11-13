import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../core/firestore.js';
  
  const getUsername = () => {
    return localStorage.getItem('username');
  };
  
  export const sendMessage = async (newMessage, otherUser) => {
    if (newMessage.trim() === '') return;
  
    try {
      const messagesRef = collection(db, 'messages');
      const messageData = {
        text: newMessage,
        createdAt: serverTimestamp(),
        to: otherUser,
        from: getUsername(),
      };
  
      await addDoc(messagesRef, messageData);
  
      // Clear the input field after sending the message
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };
  
  export const subscribeToMessages = (otherUser, setData) => {
    const username = getUsername();
  
    try {
      const messagesRef = collection(db, 'messages');
  
      const q = query(
        messagesRef,
        orderBy('createdAt'),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().to === username && doc.data().from === otherUser || doc.data().to === otherUser && doc.data().from === username) {
            updatedData.push(doc.data());
          }
        });
        setData(updatedData);
      });
  
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  export const connectedUsers = (setChatUsers) => {
    const username = getUsername();
  
    try {
      const messagesRef = collection(db, 'messages');
  
      const latestMessagesMap = new Map();
  
      const q = query(
        messagesRef,
        orderBy('createdAt', 'desc')
      );
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          const otherUser = data.to === username ? data.from : data.to;
  
          if (!latestMessagesMap.has(otherUser) || data.createdAt > latestMessagesMap.get(otherUser).createdAt) {
            latestMessagesMap.set(otherUser, data);
          }
        });
  
        // Extract the usernames from the latest messages
        const updatedData = Array.from(latestMessagesMap.values())
          .map((message) => (message.to === username ? {"username": message.from, "text": message.text} : {"username": message.to, "text": message.text}));
  
        setChatUsers(updatedData);
      });
  
      return unsubscribe;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  