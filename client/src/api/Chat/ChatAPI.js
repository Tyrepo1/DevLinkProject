import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit
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
    // Find messages where the specified user is the sender or receiver
    const q = query(
      collection(db, 'messages'),
      where('from', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const sentMessages = await getDocs(q);

    // Find messages where the specified user is the receiver
    const qReceived = query(
      collection(db, 'messages'),
      where('to', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const receivedMessages = await getDocs(qReceived);

    // Combine and process the messages
    const allMessages = [...sentMessages.docs, ...receivedMessages.docs];

    const connectedUsers = allMessages.reduce((uniqueUsers, messageDoc) => {
      const message = messageDoc.data();
      const otherUser = message.from === userId ? message.to : message.from;

      // Check if the otherUser is already in the uniqueUsers array
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
    throw error; // Propagate the error to the caller
  }
};
