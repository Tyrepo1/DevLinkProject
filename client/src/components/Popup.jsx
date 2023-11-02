import React from 'react';
import "../styles/Popup.css"
import ButtonCommon from './ButtonCommon';

const Popup = ({ isOpen, closePopup, children }) => {
  return isOpen ? (
    <div className="popup">
      <div className="popup-inner">
        
        <div className='popup-text'>{children}</div>
        <ButtonCommon
            title="Close"
            type = "button"
            onClick={closePopup}
            classButton="close-button"
        />
      </div>
    </div>
  ) : null;
};

export default Popup;
