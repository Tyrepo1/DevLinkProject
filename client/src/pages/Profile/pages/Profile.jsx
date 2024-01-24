import React from 'react';
import UserProfile from '../components/UserProfile';
import { selectProfile } from '../../../core/state/screenChanger/screenSlice';
import { useSelector } from 'react-redux';

function Profile({ profile, handleProfileSelect }) {

  const selectedProfile = useSelector(selectProfile)

  const handleChat = (dev) => {
    handleProfileSelect(dev)
  };

  return (
    <div>
      <UserProfile profile={selectedProfile} handleChat={handleChat} />
    </div>
  );
}

export default Profile;
