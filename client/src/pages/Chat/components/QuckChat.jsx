import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';

const QuickChat = ({ username, text, profilePicture, from }) => {
  return (
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={username} src={profilePicture} />
            </ListItemAvatar>
            <ListItemText primary={username} secondary={from + ": " + text} />
        </ListItem>
  );
};

export default QuickChat;
