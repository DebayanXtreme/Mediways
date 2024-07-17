import styles from "./Admin.module.css";
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
  const [prescriptions, setPrescriptions] = useState([]);//retrive

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
      const prescriptionCollection = collection(txtDB, "prescriptionData");
      const snapshot = await getDocs(query(prescriptionCollection, orderBy("dateVal", "desc")));
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      console.log("data are");
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleViewClick = (url) => {
    // Implement logic to open the PDF in a new tab or in a PDF viewer
    window.open(url, "_blank");
  };

  const handleDeleteClick = async (id) => {
    try {
      // Delete the prescription document from Firestore
      await deleteDoc(doc(txtDB, "prescriptionData", id));

      // Remove the deleted prescription from the state
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription.id !== id)
      );
    } catch (error) {
      console.error("Error deleting prescription:", error);
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
            + Add Prescription
          </button>
        </header>
//====================================retrive data from firebase=============================
        <div className={styles.prescriptionsContainer}>
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className={styles.prescription}>
              <p className={styles.details}>Dr. {prescription.nameVal} Date- {prescription.dateVal}</p>
              {/* <p>Date: {prescription.dateVal}</p> */}
              {/* <p>Description: {prescription.descriptionVal}</p> */}
              <div className={styles.detailsButton}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(prescription.imgUrl)}
                >
                  View
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(prescription.id)}
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
