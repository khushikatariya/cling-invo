import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Popup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "popup display-block" : "popup display-none";

 
  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        {children}
        
        <button className="btn btn-danger pb-2 mx-4" onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

export default Popup;
