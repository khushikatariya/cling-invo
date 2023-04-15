import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import Logo from "../components/img/logo.jpeg";
import ClipLoader from "react-spinners/ClipLoader";
import jwt_decode from "jwt-decode"

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [doesExists , setdoesExists] = useState(false);
  const [employees, setEmployees] = useState([]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const forgotPassword = () =>{
    
    navigate("/ResetPasswordForm")
  }


  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    setIsLoading(true);

    const id = "6418125c4fe6bb15e83bf9c2"

    // Send POST request to API to login user
    const response = await fetch(
      "https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employeeslogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    setIsLoading(false);

    // Handle response from API
    const result = await response.json();

    // Check if login was successful
    if (response.ok) {
      const token = result.token;
      const decoded = jwt_decode(token);
      const id = decoded.employeeId;
      console.log(decoded)
      localStorage.setItem("id",id);
      /* localStorage.setItem("token", token);
      sessionStorage.setItem("token", token); */
      document.cookie = `token=${token}; path=/;`;
      

      navigate("/Form");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container contact-form">
      <div className="contact-image">
        <img src={Logo} alt="rocket_contact" />
      </div>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <form onSubmit={handleLogin}>
          
          <h2>Cling Invoice - Sign In </h2>
          <h4 className='text-sm text-primary'><u><Link to="/AdminSignIn">Click here for Admin Login</Link></u></h4>

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
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  required
                  className="form-control"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary mt-3 pb-2" type="submit">
                  Login
                </button>
                <p className="mt-3" onClick={forgotPassword}><u>Forgot Password?</u></p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignIn;
