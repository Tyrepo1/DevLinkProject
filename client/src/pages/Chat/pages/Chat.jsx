import React, { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import { connectedUsers } from '../../../api/Chat/ChatAPI';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };
  
  useEffect(() => {
    const unsubscribe = connectedUsers(setChatUsers);

    return () => {
      unsubscribe();
    };
  }, []); // <-- Add an empty dependency array to run the effect only once

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-slate-100 text-black p-4">
        <ul>
          {chatUsers.map((user, index) => (
            <li key={index} onClick={() => handleUserSelect(user.username)} className=' cursor-pointer hover:bg-slate-200'>
              {user.username}
              <br></br>
              {user.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <ChatRoom otherUser={selectedUser || { username: "Jane", text: "mf" }} />
      </div>
    </div>
  );
};

export default Chat;
