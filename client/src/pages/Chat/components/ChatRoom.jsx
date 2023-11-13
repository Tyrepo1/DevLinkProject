import SendIcon from '@mui/icons-material/Send';
import { Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { sendMessage, subscribeToMessages } from '../../../api/Chat/ChatAPI.js';
import ChatMessage from './ChatMessage.jsx';

function ChatRoom({otherUser}) {
  const [data, setData] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    const success = await sendMessage(newMessage, otherUser);

    if (success) {
      setNewMessage('');
    }
  };

  const username = localStorage.getItem('username');
  
  useEffect(() => {
    const unsubscribe = subscribeToMessages(otherUser, setData);

    return () => {
      unsubscribe();
    };
  }, [otherUser]);


  return (
    <div className="flex flex-col h-[85vh]">
      <Paper elevation={3} className="flex-1 overflow-y-auto p-4">
        {data.map((msg, index) => (
          <ChatMessage
            key={index}
            text={msg.text}
            name={msg.to === username ? msg.from : "You"}
            sentOrReceived={msg.to === username ? 'received' : 'sent'}
          />
        ))}
        <div className="md:p-4 flex">
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="mb-2"
          />
          <span className="ml-2 my-auto">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </span>
        </div>
      </Paper>
    </div>
  );
}

export default ChatRoom;
