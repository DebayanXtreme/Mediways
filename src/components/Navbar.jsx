import React from "react";
import NavabrCSS from "./navbar.module.css";
import logo from "../assets/logo.png";
// import text from "../assets/text.png";
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // const { isLoggedIn, logout } = useAuth();

  const navigateTo = useNavigate(); // Initialize history

  // const handleLogout = () => {
  //   logout(); // Call logout function
  //   // No need to manually clear token or redirect, as logout function should handle that
  
  //   // Redirect to landing page
  //   window.location.href = '/';
  // };
  const handleLogin = () => {
    // Perform login logic (e.g., show login form, navigate to login page)
    // Call the login function from the authentication context
    // navigateTo('/login');
    console.log("login pressed");
  };
  return (
    <>
      <div className={NavabrCSS.container}>
        <div className={NavabrCSS.logo}>
          <Link to="/"> <img src={logo} alt="Mediway logo" height={60} width={200} /></Link>
          {/* <img src={text} alt="Mediway logo" height={60} width={180} /> */}
          {/* <p>MediWays</p> */}
        </div>

        <div className={NavabrCSS.leftSide}>
          {/* All of these a tags need to be changed wo react router once pages are done  */}
          <div className={NavabrCSS.links}>
          <Link to="/prescription">Prescription</Link>
            <Link to="/report">Report</Link>
            <Link to="/appointment">Appointment</Link>
            <Link to="/nearby">Nearby</Link>
          </div>
          {/* Buttons also need to made reactive and add links to them */}

          {
            // isLoggedIn ? (
            //   <button className={NavabrCSS.signup} onClick={handleLogout}>Logout</button>
            // ) : (
              <div className={NavabrCSS.buttons}>
                {/* <button className={NavabrCSS.login} onClick={handleLogin}>
                  Log In
                </button> */}
                <button className={NavabrCSS.signup}>
                  <Link to="/login">Sign Out</Link>
                </button>
              </div>
            // )
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
