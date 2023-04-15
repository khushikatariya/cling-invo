import React, {useState} from 'react'
import "../admin/Dashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getDefaultNormalizer } from '@testing-library/react';
import Template from './Template';

const GetData = () => {

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
    navigate("/GetData");
  };

  const [tableitems, settableItems] = useState([{ description: '', amount: '' }]);
  const [showInvoice, setShowInvoice] = useState(false);

    // Update the description or amount of a row
  const handleUpdateItem = (index, field, value) => {
    const newItems = [...tableitems];
    newItems[index][field] = value;
    settableItems(newItems);
  };

  // Generate the invoice template
  const handleGenerateInvoice = () => {
    navigate("/Template",{tableitems})
  };

    // Add a new row to the table
  const handleAddRow = () => {
    settableItems([...tableitems, { description: '', amount: '' }]);
  };
     // Remove a row from the table
  const handleRemoveRow = (index) => {
    const newtableItems = [...tableitems];
    newtableItems.splice(index, 1);
    settableItems(newtableItems);
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
            <Link to="/GetData">Create Inovice</Link>
          </li>
          <li className="pass">
            <Link to="/Password">Reset password</Link>
          </li>
        </ul>
      </nav>
      <main role="main">
        <section className="panel important">
          <h2>Create The Invoice</h2>
          <ul>
            <li>
              Fill the Table below with the Description and Amount to be diplayed on the Invoice.
            </li>
            {/*   <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
          </ul>
        </section>
        <br/>
        <br/>
        <section className="panel important">

    <table className="table table-bordered table-striped px-4" style={{ width: '90%',margin:'2rem' }}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableitems.map((tableitem, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={tableitem.description}
                  onChange={(e) =>
                    handleUpdateItem(index, 'description', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={tableitem.amount}
                  onChange={(e) =>
                    handleUpdateItem(index, 'amount', e.target.value)
                  }
                />
              </td>
              <td>
                <button className="btn btn-danger pb-2" onClick={() => handleRemoveRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
      </tbody>

    </table>
    <button type="button" onClick={handleGenerateInvoice} className='btn btn-success mt-1 pb-2 mb-3'>Generate Invoice</button>
    
    <button type="button" className="btn btn-primary mt-1 pb-2 mb-3 mx-4" onClick={handleAddRow}>
   
   
{/* 
      {showInvoice && <Template tableitems={items} />} */}
      Add Row
    </button>

  </section>
  </main>
  </div>
  )
}

export default GetData;