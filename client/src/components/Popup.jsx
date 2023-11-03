import React from 'react';
import "../styles/Popup.css"
import { Collapse, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({ isOpen, closePopup, children, severity }) => {
  return (
    <Collapse in={isOpen}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closePopup();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
  ) 
};

export default Popup;
