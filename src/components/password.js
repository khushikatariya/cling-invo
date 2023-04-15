import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import Logo from "../components/img/logo.jpeg"

import Cookies from 'js-cookie'

function updateUser(email, newPassword, confirmNewPassword) {

   

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword, confirmNewPassword })
    };
  
    fetch(`https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/createEmployees`, requestOptions)
      .then(response => response.text())
      .then(data => alert(data))
      .catch(error => alert(error));
  }
  

export default function Password() {

    const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const formRef = useRef();

  function checkPassword(newPassword, confirmNewPassword) {
  if (newPassword !== confirmNewPassword) {
    return alert("Password Does not Match");
  }
  return true;
}

  function handleSubmit(event) {


    event.preventDefault();
    updateUser(email, newPassword, confirmNewPassword);
    formRef.reset();

  }
  
  const navigate = useNavigate();
  const deleteToken = () => {
    Cookies.remove('token');
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  }


  const handleLogout = () => {
    deleteToken();
    // additional code to redirect the user to the login page or to update the UI
    navigate("/SignIn", {replace: true});
  }

  return (
    <div>
    <header role="banner">
      <h1>Invoice Generator - Cling Multi Solutions</h1>
      <ul className="utilities">
        {/*  <li className="users"><a href="#">My Account</a></li> */}
        <li className="logout-icon">
            <a onClick={handleLogout} className='btn-logout'>Log Out</a>


      </li>
      </ul>
    </header>
    <nav role="navigation">
      <ul className="main">
        <li className="dashboard"><Link to='/UserDashboard'>Dashboard</Link></li>
        
        <li className="user_details"><Link to='/Profile'>Bank Details</Link></li>
        <li className="edit"><Link to='/Template'>Create Inovice</Link></li>
        
       
      </ul>
    </nav>
    <main role="main">
      <section className="panel important">
        <h2>Your Bank Details</h2>
        <ul>
        <div className="container-lg">
        <form onSubmit={handleSubmit} ref={formRef}>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-success mt-2 pb-2">Save</button>
    </form>
    </div>
        </ul>
      </section>
    </main>
    <footer role="contentinfo">User</footer>
    </div>
  );
}
