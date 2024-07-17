import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./appointment.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore"

import{v4} from "uuid";
import{getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage, txtDB} from "../configuration/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";


//=======================date=======================
const cd = new Date();

  // Format the date as desired (e.g., YYYY-MM-DD)
  const year = cd.getFullYear();
  const month = String(cd.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
  const day = String(cd.getDate()).padStart(2, '0');

  // Format the date as YYYY-MM-DD
  const currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);

//=====================date======================
const Modal = ({ handleClose, show, fetchData, children }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeStart, setDateStart] = useState(new Date());
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [doctorDesignation, setDoctorDesignation] = useState("");

  const doctorDesignations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Ophthalmologist",
    "Pediatrician",
  ];
  
  // const inputRef = useRef(null);

  const handleInputChange = (event, setInputValue) => {
    setInputValue(event.target.value);
  };

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };


  const handleInputFocus = () => {
    // Set the scroll position to the top when the input is focused
    if (inputRef.current) {
      inputRef.current.scrollTop = 0;
    }
  };

  // const handleSubmit = () =>{

  //   if(name.trim()===''||date.trim()===''){
  //     alert('Some Field may be enmpty !')
  //   }

  //   else{
  //     console.log(name+date+totalSlots+description);
  //     handleClose();
  //   }

  // };


  const handleFileUpload = async () => {
    try {
      // if (!file) {
      //   toast.error("Please select a file");
      //   return;
      // }

      // const imageRef = ref(storage,`Report/${currentDate}/${file.name+v4()}`);
      // uploadBytes(imageRef,file).then(()=>{
      //   toast.success("File uploaded successfully");
      // });

      // setFile(null);
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  //=====================================================================


  const resetForm = () => {
    setName("");
    setDescription("");
    setDateStart(new Date());
    setFile(null);
    setDoctorDesignation("");
    
  };
  const showToast = (message) => {
    if (message.success) toast.success(message.success);
    else if (message.error) toast.error(message.error);
  };
  const handleSubmit = async () => {
    // showToast();
    toast.success("Fetching Doctor's Data");
    resetForm();
    handleClose();
  };

  // const showHideClassName = show ? "modal display-block" : "modal display-none";
  // const showHideClassName = show
  //   ? "styles.modal styles.display-block"
  //   : "styles.modal styles.display-none";

  const showStyle = show ? { display: "block" } : { display: "none" };
  return (
    <div className={styles.modal2} style={showStyle}>
      <section className={styles.modal_main2}>
        {children}
        {/* <h1 className={styles.formTitle1}>Appointment</h1>
        <h1 className={styles.formTitle2}>Details</h1> */}
        <div className={styles.inputDiv2}>
        <label htmlFor="doctorDesignation">Doctor Designation:</label>
          <select
            className={styles.doctorDesignation}
            value={doctorDesignation}
            onChange={(e) => setDoctorDesignation(e.target.value)}
          >
            <option value="">-- Select Designation --</option>
            {doctorDesignations.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>

          {/* Input Field */}
          <label htmlFor="name">Your Location:</label>
          <input
            type="text"
            id="name"
            className={styles.location}
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
            required
          />
        </div>

        {/* Submit button */}
        <div className={styles.inputButton2}>
          <button className={styles.formCloseButton2} onClick={handleClose}>
            Close
          </button>
          <button className={styles.formSubmitButton2} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
