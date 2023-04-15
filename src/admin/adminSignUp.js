import React from 'react'
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"
import {Link} from 'react-router-dom';
import Logo from "../components/img/logo.jpeg"
import { useNavigate } from 'react-router-dom';


export default function AdminSignUp() {

    const [formData, setFormData] = useState({
        
        email: '',
        password: '',
        
      });

      const navigate = useNavigate();
    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form behavior
    
        // Send POST request to API
        const response = await fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/admin/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        // Handle response from API
        const result = await response.text();

        if (response.ok) {
            console.log(result);
            navigate("/Otp");
      
          } 
       
      };
    
  return (
    <div className="container contact-form">
  <div className="contact-image">
    <img
      src={Logo}
      alt="rocket_contact"
    />
  </div>
  <form onSubmit={handleSubmit}>
    <h2>Admin Sign Up </h2>
    <p className="text-center ">Sign Up to generate Invoices.</p>
    <div className="row justify-content-center">
      <div className="col-md-8 ">
        
        <div className="row">
        <div className='col-6'>
        <div className="form-group">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Your Email *"
            required
            value={formData.email} onChange={handleChange}
          />
        </div>
        </div>
        <div className='col-6'>        
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password *"
            required
            value={formData.password} onChange={handleChange}
          />
        </div>
        </div>

        </div>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
          Sign Up
          </button>
          <p className='pb-3 pt-5'>Already have an account <Link to='/SignIn'>SignIn</Link></p>
        </div>
      </div>
    </div>
  </form>
</div>

  )
}

