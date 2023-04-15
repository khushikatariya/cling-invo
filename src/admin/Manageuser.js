import React,{useState, useEffect} from 'react'
import "./Dashboard.css"
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Popup from './Popup';
import "./popup.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames";



export default function Manageuser() {
  const [employees, setEmployees] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


   const togglePopup = () => {
    setShowPopup(!showPopup);
  };


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

  const NavigatetoDashboard = () =>{
    navigate("/Dashboard")
  }

  const handleDelete = (id) => {

    
   
    // Get token from cookie
    const token = document.cookie.split('=')[1];

    // Delete employee using API
    fetch(`https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error(error));
  };


  const handleInactive = (id) => {

    // Get token from cookie
    const token = document.cookie.split('=')[1];

    // Delete employee using API
    fetch(`https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employees/${id}/inactive`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
        
      })
      .catch(error => console.error(error));
  };

 
  const handleactive = (id) => {

    
    // Get token from cookie
    const token = document.cookie.split('=')[1];

    // Delete employee using API
    fetch(`https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employees/${id}/active`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        window.location.reload();
      
     
      })
      .catch(error => console.error(error));
  };

  const renderbutton = (status,empid)=>{

    console.log(empid)
    if(status === "inactive"){
      return (
      <button className='btn btn-danger pb-1 mb-2 mt-2' onClick={() => handleactive(empid)}>InActive</button>
    
      )
    }else if(status==="active"){
      return <button className='btn btn-success pb-1 mb-2 mt-2' onClick={() => handleInactive(empid)}>active</button>
    };
  }


  

  useEffect(() => {
    // Get token from cookie
    const token = document.cookie.split('=')[1];
    setIsLoading(true);

    // Fetch data from API
    fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setEmployees(data));
      setIsLoading(false);
  }, []);



  return (
    <div>
        <header role="banner">
          <h1>Admin Panel</h1>
          <ul className="utilities">
           {/*  <li className="users"><a href="#">My Account</a></li> */}
            <li className="logout-icon">
            <a onClick={handleLogout} className='btn-logout'>Log Out</a>

          </li>
          </ul>
        </header>
        <nav role="navigation">
          <ul className="main">
            <li className="dashboard"><Link to='/Dashboard'>Dashboard</Link></li>
            <li className="users"><Link to="/Manageuser">Manage Users</Link></li>
            <li className="user_details"><Link to="/UserDetails">User Details</Link></li>
            <li className="edit"><Link to='/Template'>Create Invoice</Link></li>
            
           


          </ul>
        </nav>
        <main role='main'>


        <section className="panel important">
            <h2>Managing Employees </h2>
            <ul>
              <li>Here you can add, edit and delete the details of the employees.</li>
            {/*   <li>Aliquam tincidunt mauris eu risus.</li>
              <li>Vestibulum auctor dapibus neque.</li> */}
            </ul>
          </section>
          <section className="panel important ">
         
            <h2>Employee Table</h2>
           
            {isLoading ? ( <ClipLoader />
      ) : (
            <table>
    <thead>
    
      <tr>
      <th>Sr. No.</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Action</th>
        <th>Status</th>
        <th>Emp id</th>
        
      </tr>
    </thead>
   
    <tbody>
      {employees.map((employee, index) => (
        <tr key={index}>
        <td>{index + 1}</td>
          <td>{employee.employee.firstName}</td>
          <td>{employee.employee.lastName}</td>
          <td>{employee.employee.email}</td>
         {/*  <td>
          
            <button className='btn btn-danger pb-1 mb-2 mt-2' onClick={() => handleDelete(employee.employee._id)}>Delete</button>
          </td> */}
          {/* <td>
            if({employee.employee.status==="active"}){
              <button className=' btn btn-success'>Active</button>
            }else{
              <button className='btn btn-danger'>Inactive</button>
            }
            
          </td> */}
          <td>{renderbutton(employee.employee.status,employee.employee._id)}</td>
          <td>{employee.employee.status}</td>
          <td>{employee.employee._id}</td>
         
          {/* <td><i class="fa fa-trash" aria-hidden="true" onClick={togglePopup}>
            <Popup handleClose = {togglePopup}
            show = {showPopup}>

              <h1>Want to Delete this employee?</h1>
              <span><button className="btn btn-danger pb-2" onClick={() => handleDelete(employee.employee._id)}>Confirm</button></span>

            </Popup>
          </i></td> */}
        </tr>
      ))}
    </tbody>
    
  </table>
  )
      }
    
          </section>
     
        </main>
    </div>
  )
}
