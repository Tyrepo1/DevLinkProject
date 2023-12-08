import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { db } from '../../core/firestore.js';

export const getUser = async (username) => {

  try {
    const q = query(collection(db, 'profiles'), where('username', '==', username));
    const exist = await getDocs(q);
    const user = exist.docs[0].data()
    return user
  } catch (error) {
    console.error('Error getting user: ', error);
  }
}
export const getConnectedUsers = async (userId) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('from', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const sentMessages = await getDocs(q);

    const qReceived = query(
      collection(db, 'messages'),
      where('to', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const receivedMessages = await getDocs(qReceived);

    const allMessages = [...sentMessages.docs, ...receivedMessages.docs];

    const connectedUsers = allMessages.reduce((uniqueUsers, messageDoc) => {
      const message = messageDoc.data();
      const otherUser = message.from === userId ? message.to : message.from;

      const existingUser = uniqueUsers.find((user) => user.otherUser === otherUser);

      if (!existingUser) {
        uniqueUsers.push({
          otherUser,
          latestText: message.text,
          latestFrom: message.from,
        });
      }

      return uniqueUsers;
    }, []);

    return connectedUsers;
  } catch (error) {
    console.error('Error getting connected users: ', error);
    throw error;
  }
};

export const startMessage = async (otherUser) => {
  const messageRef = collection(db, 'messages')
  try {
    const q = query(
      messageRef,
      where('from', '==', otherUser),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const sentMessages = await getDocs(q);

    const qReceived = query(
      collection(db, 'messages'),
      where('to', '==', otherUser),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const receivedMessages = await getDocs(qReceived);

    const allMessages = [...sentMessages.docs, ...receivedMessages.docs];

    if (allMessages.length == 0) {
      const messageData = {
        text: "Hello, Let's start chatting!",
        createdAt: serverTimestamp(),
        to: otherUser,
        from: localStorage.getItem("username"),
      };
      await addDoc(messageRef, messageData);
      return true;
    }
    return false
  } catch (error) {
    console.error('Error getting connected users: ', error);
    throw false;
  }
};