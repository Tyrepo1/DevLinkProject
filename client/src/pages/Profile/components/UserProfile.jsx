import React from 'react';
import { Typography, Paper, Chip, Avatar, Button } from '@mui/material';

const Profile = ({ profile, handleChat }) => {
  const getAvailabilityChipColor = () => {
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

      {/* Avatar Section */}
      <div className="absolute top-[20rem]">
        <Avatar alt={profile?.name} src={profile?.profilePicture} sx={{ width: '7rem', height: '7rem' }} />
      </div>

      {/* Basic Information */}
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

      {/* Experience and Availability */}
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

      {/* Education */}
      <Typography variant="body2" color="textSecondary" paragraph>
        {profile.educationLevel && `Education: ${profile.educationLevel}`}
      </Typography>

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <Typography variant="body2" color="textSecondary" paragraph>
          Skills:{' '}
          {profile.skills.map((skillObj, index) => (
            <Chip key={index} label={skillObj.skills} className="mx-1" />
          ))}
        </Typography>
      )}

      {/* Languages */}
      {profile.languages && profile.languages.length > 0 && (
        <Typography variant="body2" color="textSecondary" paragraph>
          Languages:{' '}
          {profile.languages.map((skillObj, index) => (
            <Chip key={index} label={skillObj.languages} className="mx-1" />
          ))}
        </Typography>
      )}

      {/* Resume Section */}
      {profile.resume && (
        <a href={profile.resume} target="_blank" rel="noopener noreferrer">
          <Button variant="contained">Download CV</Button>
        </a>
      )}

      {/* Chat Button */}
      <Button variant="contained" onClick={() => handleChat(profile.username)}>
        Chat with {profile.username}
      </Button>
    </Paper>
  );
};

export default Profile;
