import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const QR = () => {
  let navigate = useNavigate();

  // Function to navigate back to the home page and remove the QR data from local storage
  const goHome = () => {
    localStorage.removeItem('qr'); // Remove the 'qr' item from local storage
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div>
      <center>
        <h1>TOTP QR Code</h1>
        <div id="qr-code-container">
          {/* Generate and display the QR code using the value from local storage */}
          <QRCode value={localStorage.getItem('qr')} />
        </div>
      </center>
      <br />
      <br />
      <br />
      <button onClick={goHome}>Home</button> {/* Button to navigate back to the home page */}
    </div>
  );
};

export default QR;
