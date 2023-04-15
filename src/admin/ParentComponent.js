import React, { useState } from 'react';
import Popup from './Popup';
import "./popup.css"

const ParentComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup}>Show Popup</button>
      <Popup
        handleClose={togglePopup}
        show={showPopup}
      >
        <h1>Popup Content</h1>
      </Popup>
    </div>
  );
};

export default ParentComponent;
