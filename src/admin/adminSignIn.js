import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Logo from "../components/img/logo.jpeg"
//import Spinner from 'react-spinners';
import ClipLoader from 'react-spinners/ClipLoader';

function AdminSignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    setIsLoading(true);

    // Send POST request to API to login user
    const response = await fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    setIsLoading(false);

    
    // Handle response from API
    //const result = await response.json();

    // Check if login was successful
    if (response.ok) {
      const token = await response.text();
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/;`;
        navigate("/Dashboard");

    } else {
      const message = await response.text();
              alert(message);

    }
  };
  

  return (
    
    <div className="container contact-form">
    <div className="contact-image">
      <img
        src={Logo}
        alt="Cling Multi Solutions"
      />
    </div>
   
    {isLoading ? (
        <ClipLoader />
      ) : (
    <form onSubmit={handleLogin}>
        
     <h2>Cling Invoice Admin-Sign In </h2>
      {/* <p className="text-primary">Sign In to generate Invoices.</p> */}
      <h4 className='text-sm text-primary'><u><Link to="/SignIn">Click here for User Login</Link></u></h4>
      {error && <p className="text-danger">{error}</p>}
      <div className="row justify-content-center">
        <div className="col-md-8 ">
          
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              className="form-control"
              placeholder="Your Email *"
              value={formData.email} onChange={handleInputChange}
            />
          </div>
          
              
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
              className="form-control"
              placeholder="Password *"
              value={formData.password} onChange={handleInputChange}
            />
          </div>          
          <div className="text-center">
            <button className="btn btn-primary mt-3 pb-2" type="submit">
              Login
            </button>
            
            
          </div>
        </div>
      </div>
    </form>
      )
    }
  </div>
 
  )
}

export default AdminSignIn
