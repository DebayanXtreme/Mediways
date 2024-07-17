import styles from "./appointment.module.css";
// import MyCalendar from "./MyCalendar";
// import TrainingProgramList from "./TrainingProgramList";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Modal2 from "./modal2";
import radioButtons from "./radioButtons"
// import Footer from "../Footer";
import Navbar from "../Navbar";
import { collection, getDocs, deleteDoc, doc,query,orderBy } from "firebase/firestore";
import { storage, txtDB } from "../configuration/firebaseconfig";

function Appointment() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false); 
  const [reports, setReports] = useState([]);//retrive

  const handleCreateTrainingClick = () => {
    // console.log(firebaseInitialized);
    // setShowModal(true);
    setShowModal2(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      // const reportCollection = collection(txtDB, "reportData");
      // const snapshot = await getDocs(query(reportCollection, orderBy("dateVal", "desc")));
      // const data = [];
      // snapshot.forEach((doc) => {
      //   data.push({ id: doc.id, ...doc.data() });
      // });
      // console.log("data are");
      // setReports(data);
      const data = [];
      data.push({id: 1, name: "Dr. Abhirup Mukherjee", available: true},
                {id:2, name: "Dr. Debendra Dey", available: true},
                {id:3, name: "Dr. Aditya Sengupta", available: false},
                {id:4, name: "Dr. Debayan Segubta", available: true},
                {id:5, name: "Dr. Sanket Bose", available: true},
    );
    // setReports(data)
      const data2 = [];
      data2.push({id: 1, name: "Dr. Ayush Bhattacharya", available: true},
    );
    setReports(data)
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleModal2Submit = () => {
    console.log("submitted");
    setReports(data); // Replace current reports with reports2
    // setShowModal2(false);
  };

  const handleViewClick = (url) => {
    // Implement logic to open the PDF in a new tab or in a PDF viewer
    window.open(url, "_blank");
  };

  const handleAppointmentClick = async (id) => {
    try {
      // Delete the report document from Firestore
      // await deleteDoc(doc(txtDB, "reportData", id));

      // // Remove the deleted report from the state
      // setReports((prevReports) =>
      //   prevReports.filter((report) => report.id !== id)
      // );
      setShowModal(true);


    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized
    if (typeof window !== 'undefined' && window.firebase) {
      setFirebaseInitialized(true);
    }
  }, []);


  // App.firebaseInitialized();
  // App.initializeApp();

  return (
    <>
      <div className={styles.adminBody}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        {/* <div className={styles.overlay}></div> */}
        {/* <div className={styles.overlay}> */}
        {/* <MyCalendar /> */}
        <header>
          <p className={styles.welcomeTxt}>Welcome, User</p>
          {/* <div className={styles.radioButton}>
            <radioButtons/>
          </div> */}
          <button
            className={styles.createTrainingButton}
            onClick={handleCreateTrainingClick}
          >
            Search Doctors
          </button>
        </header>
//====================================retrive data from firebase=============================
        <div className={styles.reportsContainer}>
          {reports.map((report) => (
            <div key={report.id} className={report.available?styles.report:styles.report2}>
              <p className={styles.details}> {report.name}</p>
              {/* <p>Date: {report.dateVal}</p> */}
              {/* <p>Description: {report.descriptionVal}</p> */}
              <div className={styles.detailsButton}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(report.imgUrl)}
                >
                  Chat
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleAppointmentClick(report.id)}
                >
                  Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
//======================================retrive data from firebase=========================
        

        <div>
        {<Modal
            show={showModal}
            fetchData={fetchData}
            handleClose={handleCloseModal}
          />}
        </div>
        <div>
        {<Modal2
            show={showModal2}
            fetchData={fetchData}
            handleClose={handleCloseModal2}
            handleSubmit={handleModal2Submit}
          />}
        </div>
        {/* <div className={styles.adminFooter}>
          <Footer />
        </div> */}
      </div>
    </>
  );
}

export default Appointment;
