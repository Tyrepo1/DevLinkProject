import { Button } from '@mui/material';
import QRCode from 'qrcode.react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Popup from '../../../../components/Popup';
import backgroundImage from '../../../../images/background.png'

const QR = () => {
  let navigate = useNavigate();
  const location = useLocation();

  const alertMessage = location.state?.alertMessage || null;
  console.log(alertMessage)

  const [isOpen, setOpen] = useState(true)

  const closePopup = () => {
    setOpen(false)
}

  // Function to navigate back to the home page and remove the QR data from local storage
  const goHome = () => {
    localStorage.removeItem('qr'); // Remove the 'qr' item from local storage
    navigate('/login'); // Navigate back to the home page
  };

  return (
    <div>
      <img className=' absolute w-screen h-screen -z-50' src={backgroundImage} alt='Background'/>
      {alertMessage && (
            <Popup isOpen={isOpen} closePopup={closePopup} children={alertMessage} severity="success" />
            )}
    <div className='flex items-center justify-center h-screen'>
      
    <div className='border-solid shadow-2xl h-fit w-fit text-center p-8 rounded-2xl py-28 flex items-center flex-col bg-white'>
      <center>
        <div className=' w-64'>
          {/* Generate and display the QR code using the value from local storage */}
          <QRCode value={localStorage.getItem('qr')} />
        </div>
      </center>
      <br />
      <br />
      <br />
        <Button
          onClick={goHome}
          variant='contained'
          fullWidth
          sx={{
              height: "3rem",
              mb: "1rem"
          }}
      >Back</Button> {/* Button to navigate back to the home page */}
    </div>
    </div>
    </div>
  );
};

export default QR;
