import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import React from "react";
// import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
// import LandingPage from "./components/LandingPage";
// import UserModule from "./components/UserModule/UserModule";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Admin from "./components/prescriptionpage/Admin.jsx";
import Report from "./components/reportpage/report.jsx";
import Appointment from "./components/appointmentpage/appointment.jsx"
import Nearby from "./components/nearbypage/nearby.jsx"
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/loginSignUppage/Login.jsx';
import SignUpPage from './components/loginSignUppage/SignUp.jsx'
// import Landingpage from "./components/LandingPage.jsx"
// import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import TrainingApplicants from "./components/Views/TrainingApplicants";

//firebase===========================================================================================

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';

// import {getStorage} from "firebase/storage"
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB7y5eoZdzfXpzxYmV7VfYTrafRoxQzhjU",
//   authDomain: "prtest-5aaeb.firebaseapp.com",
//   projectId: "prtest-5aaeb",
//   storageBucket: "prtest-5aaeb.appspot.com",
//   messagingSenderId: "325451265802",
//   appId: "1:325451265802:web:e460e57d911749ac20acf3",
//   measurementId: "G-R9RSYEKKXC",
//   storageBucket:"https://console.firebase.google.com/u/0/project/prtest-5aaeb/storage/prtest-5aaeb.appspot.com/files"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// const analytics = getAnalytics(app);
// //firebase===========================================================================================
const router = createBrowserRouter([

  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/prescription",
    element: <Admin/>,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/appointment",
    element: <Appointment/>
  },
  {
    path: "/nearby",
    element: <Nearby />,
  },
  
]);
//=====
// const Main = () => {
//   const [firebaseInitialized, setFirebaseInitialized] = useState(false);

//   useEffect(() => {
//     // Check if Firebase is initialized
//     if (app) {
//       setFirebaseInitialized(true);
//     }
//   }, []);

//   return (
//     <React.StrictMode>
//       {firebaseInitialized && (
//         <>
//           <RouterProvider router={router} />
//           <ToastContainer />
//         </>
//       )}
//     </React.StrictMode>
//   );
// };


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <RouterProvider router={router} />
      <ToastContainer />
    {/* </AuthProvider> */}
  </React.StrictMode>
)
