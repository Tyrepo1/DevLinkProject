import React from 'react';
import UserProfile from '../components/UserProfile';

function Profile({ profile, setSelectedItem, setToUser }) {
  const handleChat = (dev) => {
    alert(JSON.stringify(dev))
    
  };

  return (
    <div>
      <UserProfile profile={profile} handleChat={handleChat} />
    </div>
  );
}

export default Profile;
