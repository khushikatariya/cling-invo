import React, { useState } from "react";
import "../admin/Dashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function UserDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const deleteToken = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
  };

  

  /* const JWT_SECRET =
    "b2ad9612ac739b0e0e13b8b4ad626a3a38507d8504b2abc72cd9e17af91e94bfd64f29faac6a176060256b2bf8b48b134cf8a84a9d72ac73d4aa6eef12417ce9";
 */
  const token = document.cookie.split('=')[1];
  const decodedToken = jwt_decode(token);
  console.log(decodedToken);

  const userId = decodedToken.employeeId;
  localStorage.setItem("Id",userId);

  const handleLogout = () => {
    deleteToken();
    // additional code to redirect the user to the login page or to update the UI
    navigate("/SignIn", { replace: true });
  };

  const navigateToTemplate = () => {
    // 👇️ navigate to /contacts
    navigate("/Template");
  };

  return (
    <div>
      <header role="banner">
        <h1>Invoice Generator - Cling Multi Solutions</h1>
        <ul className="utilities">
          {/*  <li className="users"><a href="#">My Account</a></li> */}
          <li className="logout-icon">
            <a onClick={handleLogout} className="btn-logout">
              Log Out
            </a>
          </li>
        </ul>
      </header>
      <nav role="navigation">
        <ul className="main">
          <li className="dashboard">
            <a href="#">Dashboard</a>
          </li>

          <li className="user_details">
            <Link to="/Profile">Bank Details</Link>
          </li>
          <li className="edit">
            <Link to="/Template">Create Inovice</Link>
          </li>
          <li className="pass">
            <Link to="/Password">Reset password</Link>
          </li>
        </ul>
      </nav>
      <main role="main">
        <section className="panel important">
          <h2>Welcome to Your Dashboard </h2>
          <ul>
            <li>
              This application will let you download the invoice on the click of
              button.
            </li>
            {/*   <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
          </ul>
        </section>

        <button
          className="btn btn-success mt-3 pb-2"
          onClick={navigateToTemplate}
        >
          Create the Invoice
        </button>

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
  );
}
