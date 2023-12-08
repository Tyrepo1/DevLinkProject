import React from 'react';
import UserProfile from '../components/UserProfile';

function Profile({ profile, handleProfileSelect }) {
  const handleChat = (dev) => {
    handleProfileSelect(dev)
    
  };

  return (
    <div>
      <UserProfile profile={profile} handleChat={handleChat} />
    </div>
  );
}

export default Profile;
