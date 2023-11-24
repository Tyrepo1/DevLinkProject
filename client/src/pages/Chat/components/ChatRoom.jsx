import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../core/firestore.js';
import ChatMessage from '../components/ChatMessage'
import { getUser } from '../../../api/Chat/ChatAPI.js';

function ChatRoom({ otherUser }) {
  const username = localStorage.getItem('username');

  const messagesRef = collection(db, 'messages');

  const [data] = useCollectionData(query(
    messagesRef,
    where('to', 'in', [username, otherUser]),
    where('from', 'in', [username, otherUser])
  ));
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    const messageData = {
      text: formValue,
      createdAt: serverTimestamp(),
      to: otherUser,
      from: username,
    };
    await addDoc(messagesRef, messageData);

    setFormValue('');
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };



  return (
    <div className="flex flex-col h-[85vh] overflow-scroll">
      {data && data.map(msg => <ChatMessage msg={msg} />)}
      <div className="md:p-4 flex items-en mb-2 bg-white sticky bottom-0">
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="mb-2"
        />
        <span className='ml-2 my-auto'>
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </span>
      </div>
    </div>
  );
}

export default ChatRoom;
