import React,{useState} from 'react'
import "../admin/Dashboard.css"
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'


export default function Profile() {

    const [bankaccnumber, setBankaccnumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [pannumber, setPanNumber] = useState("");
  const [accountholdername, setAccountholdername] = useState("");
  const [acctype, setAcctype] = useState("");
  const [bankname, setBankname] = useState("");
  const [branchname, setBranchname] = useState("");
  const [error, setError] = useState(null);

  const getToken = () => {
    // Check session storage for token
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

  
 
  const deleteToken = () => {
    Cookies.remove('token');
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  }
  
  const handleLogout = () => {
    deleteToken();
    // additional code to redirect the user to the login page or to update the UI
    console.clear()
    navigate("/SignIn", {replace: true});
  }



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
            pannumber,
            
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
      alert("User data added or updated successfully")

    } catch (err) {
      console.error(err);
      setError(err.message);
      console.log(error)
      alert(err.message)
    }
  };


  return (
    <div>
        <header role="banner">
          <h1>Invoice Generator - Cling Multi Solutions</h1>
          <ul className="utilities">
            {/* <li className="users"><a href="#">My Account</a></li> */}
            <li className="logout-icon">
            <a onClick={handleLogout} className='btn-logout'>Log Out</a>

          </li>
          </ul>
        </header>
        <nav role="navigation">
          <ul className="main">
            <li className="dashboard"><Link to='/UserDashboard'>Dashboard</Link></li>
            
            <li className="user_details"><a href="#">Bank Details</a></li>
            <li className="edit"><Link to='/Template'>Create Inovice</Link></li>
            <li className="pass"><Link to='/Password'>Reset password</Link></li>
            
           
          </ul>
        </nav>
        <main role="main">
          <section className="panel important">
            <h2>Your Bank Details</h2>
            <p>The details can be updates from here.</p>
            <ul>
            <form onSubmit={handleSubmit}>
       
        <div className="row justify-content-center">
          <div className="col-md-4 ">
            <div className="form-group mt-2">
            <label>Account Holder Name {"(As per Bank Name)"}</label>
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
            <div className="form-group mt-3">
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
            <div className="row mt-3">
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
            <div className="row mt-3">
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
              <div className="row mt-3">
                <div className="col-6">
                  <div className="form-group">
                  <label for="acctype">Account Type</label>

{/* <select id="acctype"  name="acctype" required onChange={(event) => setAcctype(event.target.value)}>
  <option value="Saving">Savings</option>
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
            <div className="text-center mt-3">
              <button className="btn btn-primary pb-2" type="submit">
               Save
              </button>
             
            </div>
          </div>
        </div>
      </form>
            </ul>
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
        <footer role="contentinfo">User</footer>
        </div>
  )
}


