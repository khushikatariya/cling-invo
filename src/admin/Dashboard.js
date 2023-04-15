import React, { useState,useEffect } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Logo from "../components/img/logo.jpeg"

function generatePassword() {
  // Set possible characters for password
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // Set length of password
  const passwordLength = 10;

  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}


export default function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeCount, setemployeeCount] = useState([]);


  
  const getToken = () => {
    // Check session storage for token
    /* const sessionToken = sessionStorage.getItem("auth-token");
    if (sessionToken) {
      console.log("Token found in session storage");
      return sessionToken;
    }

    // Check local storage for token
    const localToken = localStorage.getItem("auth-token");
    if (localToken) {
      console.log("Token found in local storage");
      return localToken;
    } */

    // Check cookies for token
    const Token = getCookie("token");
    if (Token) {
      console.log("Token found in cookie", Token);
      return Token;
    }

    console.log("No token found");
    return null;
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const token = getCookie("token");

  useEffect(() =>{
// Fetch data from API
fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employees', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => {
    setemployeeCount(data.length);
    
  });
  },[]);

  const deleteToken = () => {
    Cookies.remove('token');
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

  }

  const navigate = useNavigate();

  const handleLogout = () => {
    deleteToken();
    // additional code to redirect the user to the login page or to update the UI
    navigate("/AdminSignIn", {replace: true});
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    
    console.log("Token:", token);

    if (!token) {
      setError("No authorization token provided");
      return;
    }

 
    try {
      const response = await fetch(
        "https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/createEmployees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );
      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Failed to add or update user data or user already exists.");
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setError(null);

      console.log("User data added or updated successfully");
      alert("User data added or updated successfully")
      
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert(error)
    }
  };

  //Password Generator
  //const [password, setPassword] = useState('');

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword();
    setPassword(generatedPassword);
  };

  return (
    <div>
      <header role="banner">
      
        <h1>Admin Panel</h1>
        <ul className="utilities">
         {/*  <li className="users">
            <a href="#">My Account</a>
          </li> */}
          <li className="logout-icon">
         
            <a onClick={handleLogout} className='btn-logout'>Log Out</a>

          </li>
        </ul>
      </header>
      <nav role="navigation">
        <ul className="main">
          <li className="dashboard">
            <a href="#">Dashboard</a>
          </li>
          <li className="users">
            <Link to="/Manageuser">Manage Users</Link>
          </li>
          <li className="user_details">
            <Link to="/UserDetails">User Details</Link>
          </li>
          <li className="edit">
            <Link to="/Template">Create Inovice</Link>
          </li>
        </ul>
      </nav>
      <main role="main">
        <section className="panel important">
          <h2>Welcome to Your Dashboard </h2>
          <ul>
            <li>
              This is the the Admin Panel for managing employees and their
              invoice datas.
            </li>
            {/*   <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
          </ul>
        </section>
        <section className="panel">
          <h2>Employees</h2>
          <ul>
            <li>
              <b>{employeeCount} </b>Registered Employees
            </li>
            {/* <li><b>18</b> Drafts.</li>
              <li>Most popular post: <b>This is a post title</b>.</li> */}
          </ul>
        </section>
        <section className="panel">
          <h2>Invoices Raised</h2>
          <ul>
            <li>
              Invoices has been Emailed
            </li>
            {/*  <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
          </ul>
        </section>
        <section className="panel important">
          <h2>Add an Employee</h2>
          {isLoading ? (
        <ClipLoader />
      ) : (
          <form onSubmit={handleSubmit}>
            <div className="twothirds">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
              />
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Smith"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div className="onethird">
              <label htmlFor="email">Email</label>
              <input 
               type="email" 
               name="email"
               id="email" 
               value={email}
                required
                onChange={(event)=> setEmail(event.target.value)} 
               />
              <label htmlFor="password">Password</label>
              <input
               type="text"
                name="password"
                id="password"
                value={password}
                required
                readOnly
                onChange={(event)=> setPassword(event.target.value)}
               />
               <button onClick={handleGeneratePassword} className="btn btn-success mt-2 pb-2">Generate Password</button>

              <div>
                <input type="submit" defaultValue="Submit" />
              </div>
            </div>
          </form>
      )
          }
        </section>
        {/* <section className="panel">
            <h2>feedback</h2>
            <div className="feedback">This is neutral feedback Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, praesentium. Libero perspiciatis quis aliquid iste quam dignissimos, accusamus temporibus ullam voluptatum, tempora pariatur, similique molestias blanditiis at sunt earum neque.</div>
            <div className="feedback error">This is warning feedback
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                <li>Aliquam tincidunt mauris eu risus.</li>
                <li>Vestibulum auctor dapibus neque.</li>
              </ul></div>
            <div className="feedback success">This is positive feedback</div>
          </section>
          <section className="panel ">
            <h2>Table</h2>
            <table>
              <tbody><tr>
                  <th>Username</th>
                  <th>Posts</th>
                  <th>comments</th>
                  <th>date</th>
                </tr>
                <tr>
                  <td>Pete</td>
                  <td>4</td>
                  <td>7</td>
                  <td>Oct 10, 2015</td>
                </tr>
                <tr>
                  <td>Mary</td>
                  <td>5769</td>
                  <td>2517</td>
                  <td>Jan 1, 2014</td>
                </tr>
              </tbody></table>
          </section> */}
      </main>
      <footer role="contentinfo">Admin </footer>
    </div>
  );
}
