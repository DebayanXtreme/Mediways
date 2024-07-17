import styles from "./report.module.css";
// import MyCalendar from "./MyCalendar";
// import TrainingProgramList from "./TrainingProgramList";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
// import Footer from "../Footer";
import Navbar from "../Navbar";
import { collection, getDocs, deleteDoc, doc,query,orderBy } from "firebase/firestore";
import { storage, txtDB } from "../configuration/firebaseconfig";

function Admin() {
  const [showModal, setShowModal] = useState(false);
  const [reports, setReports] = useState([]);//retrive

  const handleCreateTrainingClick = () => {
    console.log(firebaseInitialized);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const reportCollection = collection(txtDB, "reportData");
      const snapshot = await getDocs(query(reportCollection, orderBy("dateVal", "desc")));
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log("data are");
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleViewClick = (url) => {
    // Implement logic to open the PDF in a new tab or in a PDF viewer
    window.open(url, "_blank");
  };

  const handleDeleteClick = async (id) => {
    try {
      // Delete the report document from Firestore
      await deleteDoc(doc(txtDB, "reportData", id));

      // Remove the deleted report from the state
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
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
          <button
            className={styles.createTrainingButton}
            onClick={handleCreateTrainingClick}
          >
            + Add Reports
          </button>
        </header>
//====================================retrive data from firebase=============================
        <div className={styles.reportsContainer}>
          {reports.map((report) => (
            <div key={report.id} className={styles.report}>
              <p className={styles.details}>Type -  {report.nameVal} Date- {report.dateVal}</p>
              {/* <p>Date: {report.dateVal}</p> */}
              {/* <p>Description: {report.descriptionVal}</p> */}
              <div className={styles.detailsButton}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(report.imgUrl)}
                >
                  View
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(report.id)}
                >
                  Delete
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
        {/* <div className={styles.adminFooter}>
          <Footer />
        </div> */}
      </div>
    </>
  );
}

export default Admin;
