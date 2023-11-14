import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db } from '../../core/firestore.js';

const getUsername = () => localStorage.getItem('username');

export const sendMessage = async (newMessage, otherUser) => {
  if (newMessage.trim() === '') return false;

  try {
    const messagesRef = collection(db, 'messages');
    const messageData = {
      text: newMessage,
      createdAt: serverTimestamp(),
      to: otherUser,
      from: getUsername(),
    };

    await addDoc(messagesRef, messageData);

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
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedData = querySnapshot.docs
        .filter((doc) => {
          const data = doc.data();
          return (
            (data.to === username && data.from === otherUser) ||
            (data.to === otherUser && data.from === username)
          );
        })
        .map((doc) => doc.data());

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
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const otherUser = data.to === username ? data.from : data.to;

        if (
          !latestMessagesMap.has(otherUser) ||
          data.createdAt > latestMessagesMap.get(otherUser).createdAt
        ) {
          latestMessagesMap.set(otherUser, data);
        }
      });

      const updatedData = Array.from(latestMessagesMap.values()).map((message) => ({
        username: message.to === username ? message.from : message.to,
        text: message.text,
        from: message.from,
      }));

      setChatUsers(updatedData);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const unansweredConversations = (setUnansweredUsers) => {
  const username = getUsername();

  try {
    const messagesRef = collection(db, 'messages');
    const latestMessagesMap = new Map();
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const otherUser = data.to === username ? data.from : data.to;

        if (!latestMessagesMap.has(otherUser) || data.createdAt > latestMessagesMap.get(otherUser).createdAt) {
          latestMessagesMap.set(otherUser, data);
        }
      });

      // Extract the usernames from the latest messages
      const latestMessages = Array.from(latestMessagesMap.values());

      // Find users who started a conversation but haven't received a response
      const unansweredUsers = latestMessages
        .filter(message => message.from !== username) // Exclude messages sent by the user
        .filter(message => message.to === username) // Filter messages received by the user
        .filter(message => !latestMessages.some(m => m.from === message.to && m.to === message.from)) // Filter conversations where the user has not responded
        .map(message => ({
          from: message.from,
          text: message.text,
          createdAt: message.createdAt.toDate().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
          }),
        }));

      setUnansweredUsers(unansweredUsers);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching unanswered conversations:', error);
  }
};

export const startNewChat = async (otherUser) => {
  try {
    const existingChat = await checkExistingChat(otherUser);

    if (existingChat) {
      return false;
    }

    const initialMessage = 'Hello! Let\'s start chatting.';
    await sendMessage(initialMessage, otherUser);

    return true;
  } catch (error) {
    console.error('Error starting new chat:', error);
    return false;
  }
};

const checkExistingChat = async (otherUser) => {
  const username = getUsername();

  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const querySnapshot = await getDocs(q);

    const existingChat = querySnapshot.docs.some((doc) => {
      const data = doc.data();
      return (
        (data.to === username && data.from === otherUser) ||
        (data.to === otherUser && data.from === username)
      );
    });

    return existingChat;
  } catch (error) {
    console.error('Error checking existing chat:', error);
    throw error;
  }
};


