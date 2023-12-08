import { Divider, Skeleton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getConnectedUsers, startMessage } from '../../../api/Chat/ChatAPI';
import ChatRoom from '../components/ChatRoom';
import QuickChat from '../components/QuckChat';

const Chat = ({ toUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const username = localStorage.getItem("username")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(toUser){
          await startMessage(toUser)
          setSelectedUser(toUser)
        }
        const connectedUsers = await getConnectedUsers(username)
        setChatUsers(connectedUsers)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleUserSelect = (user) => {
    setSelectedUser(user.otherUser);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = chatUsers.filter((user) =>
    user.otherUser.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="flex bg-gray-100 h-[86vh]">
      <div className="w-1/4 bg-slate-200 text-black p-4 border-r border-gray-300 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Chat Users</h1>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4"
        />
        <ul >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <li key={index} className='mb-2 p-2 rounded-lg transition duration-300'>
                <Skeleton variant="rectangular" width={40} height={40} />
                <Divider className="my-2" />
              </li>
            ))
          ) : (
            filteredUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => handleUserSelect(user)}
                className='cursor-pointer hover:bg-slate-300 mb-2 p-2 rounded-lg transition duration-300'
              >
                <QuickChat
                  username={user.otherUser}
                  text={user.latestText}
                  profilePicture={user.user}
                  from={user.latestFrom}
                />
                <Divider className="my-2" />
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="flex-grow">
        <ChatRoom otherUser={selectedUser || (chatUsers.length > 0 && chatUsers[0].otherUser)} />
      </div>
    </div>
  );
};

export default Chat;
