import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Template from "./Template";
import Logo from "../components/img/logo.jpeg"

import ClipLoader from 'react-spinners/ClipLoader';



export default function Form() {
  const [bankaccnumber, setBankaccnumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [pannumber, setPanNumber] = useState("");
  const [accountholdername, setAccountholdername] = useState("");
  const [acctype, setAcctype] = useState("");
  const [bankname, setBankname] = useState("");
  const [branchname, setBranchname] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const getToken = () => {
    /* // Check session storage for token
    const sessionToken = sessionStorage.getItem("auth-token");
    if (sessionToken) {
      console.log("Token found in session storage");
      return sessionToken;
    }

    // Check local storage for token
    const localToken = localStorage.getItem("auth-token");
    if (localToken) {
      console.log("Token found in local storage");
      return localToken;
    }
 */
    // Check cookies for token
    const Token = getCookie("token");
    if (Token) {
      console.log("Token found in cookie", Token);
      return Token;
    }

    console.log("No token found");
    return null;
  };

  const navigate = useNavigate();

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = getCookie("token");
    console.log("Token:", token);

    if (!token) {
      setError("No authorization token provided");
      return;
    }

    try {
      const response = await fetch(
        "https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/addBankDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bankaccnumber,
            
            accountholdername,
            mobilenumber,
            acctype,
            bankname,
            branchname,
            ifsc,
            pannumber
           
            
            
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add or update user data");
        
        
      }

      setBankaccnumber("");
      setIfsc("");
      setMobileNumber("");
      setPanNumber("");
      setAccountholdername("");
      setAcctype("");
      setBankname("");
      setBranchname("");
      setError(null);

      console.log("User data added or updated successfully");
      navigate("/UserDashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert(err.message)
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
        <h2>User Data Form</h2>
        <p className="text-center">
          Fill up the details (All details are necessary)
        </p>
        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <div className="form-group">
            <label>Account Holder Name</label>
              <input
                type="text"
                name="accountholdername"
                className="form-control"
                placeholder="Account Holder Name"
                id="accountholdername"
              value={accountholdername}
              required
              onChange={(event) => setAccountholdername(event.target.value)}
              />
            </div>
            <div className="form-group">
            <label>Bank Account Number</label>
              <input
                type="text"
                name="bankaccnumber"
                className="form-control"
                placeholder="Account Number"
                id="bankaccnumber"
              value={bankaccnumber}
              required
              onChange={(event) => setBankaccnumber(event.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobilenumber"
                    className="form-control"
                    placeholder="Mobile Number"
                    id="mobilenumber"
              value={mobilenumber}
              required
              onChange={(event) => setMobileNumber(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                <label>Pan Number</label>
                  <input
                    type="text"
                    name="pannumber"
                    className="form-control"
                    placeholder="Pan Number"
                    id="panNumber"
              value={pannumber}
              required
              onChange={(event) => setPanNumber(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6">
                <div className="form-group">
                <label>Bank Name</label>
                  <input
                    type="text"
                    name="bankname"
                    className="form-control"
                    placeholder="Bank Name"
                    id="bankname"
              value={bankname}
              required
              onChange={(event) => setBankname(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                <label>Branch Name</label>
                  <input
                    type="text"
                    name="branchname"
                    className="form-control"
                    placeholder="Branch Name "
                    id="branchname"
              value={branchname}
              required
              onChange={(event) => setBranchname(event.target.value)}
                  />
                </div>
              </div>
              <div>
              
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                  <label for="acctype">Account Type (Savings or Current) </label>

{/* <select id="acctype"  name="acctype" required onChange={(event) => setAcctype(event.target.value)}>
  <option value="Savings">Savings</option>
  <option value="Current">Current</option>
</select> */}
                   <input
                      type="text"
                      name="acctype"
                      className="form-control"
                      placeholder="Account Type"
                      id="acctype"
              value={acctype}
              required
              onChange={(event) => setAcctype(event.target.value)}
                    /> 
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                  <label>IFSC Code</label>
                    <input
                      type="text"
                      name="ifsc"
                      className="form-control"
                      placeholder="IFSC Code"
                      id="ifsc"
              value={ifsc}
              required
              onChange={(event) => setIfsc(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 ">
              <button className="btn btn-primary pb-2" type="submit">
                Save
              </button>
             
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
