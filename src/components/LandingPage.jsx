import React, { useEffect } from "react";
import LandingPageCSS from "./LandingPage.module.css";
import Navbar from "./Navbar";
import report from "../assets/report.png";
import map from "../assets/map.png";
import appointment from "../assets/appointment.png"
import doctors from "../assets/doctors.png"
import { toast } from "react-toastify";
import Login from "./loginSignUppage/Login.jsx"
// import { useAuth } from "../context/AuthContext";
function LandingPage() {

  useEffect(() => {
    const hasRedirected = localStorage.getItem("redirectedToLogin");

    if (!hasRedirected) {
      const timeoutId = setTimeout(() => {
        // Redirect to login page after 1 second
        window.location.href = "/login"; // Replace "/login" with your actual login path
        localStorage.setItem("redirectedToLogin", true); // Set flag after redirect
      }, 1000); // 1000 milliseconds = 1 second

      return () => clearTimeout(timeoutId);
    }
  }, []);

  // const { logout } = useAuth();
  useEffect(() => {
    // checkToken();
  }, []);

  const showToast = (message) => {
    if (message.success) toast.success(message.success);
    else if (message.error) toast.error(message.error);
  };

  // const checkToken = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/checkToken", {
  //       credentials: "include",
  //     });

  //     // console.log(response);
  //     const result = await response.json();
  //     if (response.status != 200) {
  //       // alert(result);
  //       logout();
  //     }
  //   } catch (error) {
  //     showToast({ error: error.message });
  //   }
  // };

  return (
    <>
    <div className={LandingPageCSS.bodyDiv}>
      <div className={LandingPageCSS.navbar}>
        {/* <Navbar isLoggedIn={false} /> */}
        <Navbar/>
      </div>
      <div className={LandingPageCSS.heroContainer}>
        <div >
          <p className={LandingPageCSS.herotext}>
          Your All-in-One <br />
            <span className={LandingPageCSS.highlight}>Healthcare </span>
            hub.
          </p>
        </div>
        <div>
          <p className={LandingPageCSS.herotext2}>
          Your Health Data. Your Nearby Care. Your Convenience. <br />
          <span className={LandingPageCSS.highlight}> Your Trusted Partner in Healthcare Management. <br /></span>
          </p>
        </div>
      </div>

      {/* Banner - would work better as component*/}
      <div className={LandingPageCSS.bannerContainer}>
        <div className={LandingPageCSS.banner}>
          <div className={LandingPageCSS.topic}>
            <div className={LandingPageCSS.imgFrame}>
              <img
                className={LandingPageCSS.img}
                src={report}
                alt="Report Logo"
              />
            </div>
            <div className={LandingPageCSS.content}>
              <div className={LandingPageCSS.header}>
                <p>Store the Docs</p>
              </div>
              <div className={LandingPageCSS.body}>
                <p>
                  Effeciently access or upload your <br />medical documents.
                </p>
              </div>
            </div>
          </div>
          <div className={LandingPageCSS.topic}>
            <div className={LandingPageCSS.imgFrame}>
              <img
                className={LandingPageCSS.img}
                src={map}
                alt="map logo"
              />
            </div>
            <div className={LandingPageCSS.content}>
              <div className={LandingPageCSS.header}>
                <p>Nearby Me</p>
              </div>
              <div className={LandingPageCSS.body}>
                <p>
                  Easily find your nearest  hospitals and <br />nursing homes
                </p>
              </div>
            </div>
          </div>
          <div className={LandingPageCSS.topic}>
            <div className={LandingPageCSS.imgFrame}>
              <img
                className={LandingPageCSS.img}
                src={appointment}
                alt="appointment Logo"
              />
            </div>
            <div className={LandingPageCSS.content}>
              <div className={LandingPageCSS.header}>
                <p>Appointment</p>
              </div>
              <div className={LandingPageCSS.body}>
                <p>
                  Find easily all kind of available <br />
                  doctors as well as make apointment and chat with them
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={LandingPageCSS.bottomContainer}>
        <img
          className={LandingPageCSS.img}
          src={doctors}
          alt="Group of doctors"
        />
        <div className={LandingPageCSS.content}>
          <div className={LandingPageCSS.header}>
            <h3>
              Premium Experience in any Medical stuffs
            </h3>
          </div>
          <div className={LandingPageCSS.tags}>
            <ul>
              <li>Easily accessible</li>
              <li>User Friendly</li>
              <li>Safe and Secure</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer */}
    </div>
    </>
  );
}

export default LandingPage;
