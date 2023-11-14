import React, { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import { connectedUsers, sendMessage, startNewChat } from '../../../api/Chat/ChatAPI';
import QuickChat from '../components/QuckChat';
import { Button, Divider, Skeleton, TextField } from '@mui/material';

const Chat = ({ toUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUserSelect = (user) => {
    setSelectedUser(user.username);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = connectedUsers((users) => {
      setChatUsers(users);
      setIsLoading(false);
    });
    if (toUser && !selectedUser) {
      const user = chatUsers.find((user) => user.username === toUser);
      if (user) {
        setSelectedUser(user.username);
      }
    }

    return () => {
      unsubscribe();
    };
  }, [chatUsers]);


  // Filter users based on the search term
  const filteredUsers = chatUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-100 h-[86vh]">
      {/* Sidebar */}
      <div className="w-1/4 bg-slate-200 text-black p-4 border-r border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Chat Users</h1>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4"
        />
        <ul>
          {isLoading ? (
            // Show Skeleton while loading
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className='mb-2 p-2 rounded-lg transition duration-300'>
                <Skeleton variant="rectangular" width={40} height={40} />
                <Divider className="my-2" />
              </li>
            ))
          ) : (
            // Show filtered chat users
            filteredUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => handleUserSelect(user)}
                className='cursor-pointer hover:bg-slate-300 mb-2 p-2 rounded-lg transition duration-300'
              >
                <QuickChat
                  username={user.username}
                  text={user.text}
                  profilePicture={user.username}
                  from={user.from}
                />
                <Divider className="my-2" />
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        <ChatRoom otherUser={selectedUser || (chatUsers.length > 0 && chatUsers[0].username)} />
      </div>
    </div>
  );
};

export default Chat;
