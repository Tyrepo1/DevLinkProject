// src/Profile.js
import React from 'react';
import { Typography, Paper, Chip, Avatar, Button } from '@mui/material';

const Profile = ({ profile, handleChat }) => {
  const getAvailabilityChipColor = () => {
    // Customize this function based on your logic for determining availability color
    return profile.availability === 'Available' ? 'success' : 'error';
  };
  return (
    <Paper elevation={3} className="p-6">
      <div className="relative mb-20">
        <img
          src="https://wiki.tripwireinteractive.com/TWIimages/4/47/Placeholder.png"
          className="-z-50 w-full object-cover h-64"
          alt="Placeholder"
        />
        {profile?.bannerPicture && (
          <img
            className="w-full h-64 object-cover absolute top-0"
            src={profile?.bannerPicture}
            alt="Banner"
          />
        )}
      </div>
      <div className="absolute top-[20rem]">
        <Avatar alt={profile?.name} src={profile?.profilePicture} sx={{ width: '7rem', height: '7rem' }} />
      </div>
      <Typography variant="h4" gutterBottom>
        {profile?.name}
      </Typography>
      <Typography variant="body1" paragraph>
        {profile?.about}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        {profile.age && `Age: ${profile.age} | `}
        {profile.location && `Location: ${profile.location}`}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        {profile.experienceLevel && `Experience Level: ${profile.experienceLevel} | `}
        {profile.availability && `Availability: `}
        <Chip
          label={profile.availability}
          color={getAvailabilityChipColor()}
          variant="outlined"
          size="small"
          className="mx-1"
        />
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        {profile.educationLevel && `Education: ${profile.educationLevel}`}
      </Typography>
      {profile.skills && profile.skills.length > 0 && (
        <Typography variant="body2" color="textSecondary" paragraph>
          Skills:{' '}
          {profile.skills.map((skill, index) => (
            <Chip key={index} label={skill} className="mx-1" />
          ))}
        </Typography>
      )}
      {profile.languages && profile.languages.length > 0 && (
        <Typography variant="body2" color="textSecondary" paragraph>
          Languages:{' '}
          {profile.languages.map((language, index) => (
            <Chip key={index} label={language} className="mx-1" />
          ))}
        </Typography>
      )}
      {profile.resume && (
        <a href={profile.resume}>
        <Button variant='contained'>Download CV</Button>
      </a>
      )}
      <Button variant='contained' onClick={() => handleChat(profile.name)}>Chat</Button>    
    </Paper>
  );
};

export default Profile;
