import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Admin.module.css";
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

      // const imageRef = ref(storage,`Prescription/${currentDate}/${file.name+v4()}`);
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
    
  };
  const showToast = (message) => {
    if (message.success) toast.success(message.success);
    else if (message.error) toast.error(message.error);
  };
  const handleSubmit = async () => {
    // showToast();
    try {
      if (!file) {
        toast.error("Please select a file");
        return;
      }

      const uniqueFileName = `${currentDate}/${file.name+v4()}`;
      const imageRef = ref(storage,`Prescription/${uniqueFileName}`);//prescription/22/04/2024/8thsem
      uploadBytes(imageRef,file).then(data=>{
        getDownloadURL(data.ref).then(val=>{
          setImgUrl(val);
          
        // setImgUrl(downloadURL);
        const valRef = collection(txtDB,'prescriptionData');
        addDoc(valRef,{nameVal:name, dateVal:dateTimeStart, descriptionVal: description, imgUrl: val}).then(()=>{
          window.location.reload().then(()=>{
            toast.success("File uploaded successfully");
          });

        })
        // console.log(downloadURL);
          // return getDownloadURL(imageRef);
        })
      })
      // .then((downloadURL)=>{
      //   console.log("Download URL:", downloadURL);
      //   // setImgUrl(downloadURL);
      //   const valRef = collection(txtDB,'prescriptionData');
      //   addDoc(valRef,{nameVal:name, dateVal:dateTimeStart, descriptionVal: description, imgUrl: downloadURL});
      //   console.log(downloadURL);
      //   toast.success("File uploaded successfully");

      // })
      
      // const downloadURL = await getDownloadURL(imageRef);
      
      
      
      // setFile(null);
      console.log("clicked");
      resetForm();
      handleClose();
    } catch (error) {
      showToast({ error: error.message });
      console.error("Error inserting data:", error);
    }
  };

  // const showHideClassName = show ? "modal display-block" : "modal display-none";
  // const showHideClassName = show
  //   ? "styles.modal styles.display-block"
  //   : "styles.modal styles.display-none";

  const showStyle = show ? { display: "block" } : { display: "none" };
  return (
    <div className={styles.modal} style={showStyle}>
      <section className={styles.modal_main}>
        {children}
        <h1 className={styles.formTitle1}>Prescription</h1>
        <h1 className={styles.formTitle2}>Details</h1>
        <div className={styles.inputDiv}>
          <div>
            {/* <label htmlFor="name">Training name :</label>
            <br /> */}
            <input
              type="text"
              id="name"
              className={styles.name}
              value={name}
              placeholder="Doctor's name"
              onChange={(e) => handleInputChange(e, setName)}
            />
          </div>
          <div className={styles.dateDiv}>
            {/* <label htmlFor="date">Start Date Time</label>
            <br /> */}
            <input
              type="datetime-local"
              id="date"
              className={styles.dateStart}
              value={dateTimeStart}
              onChange={(e) => handleInputChange(e, setDateStart)}
            />
          </div>
          
          <div>
            {/* <label htmlFor="description" onFocus={handleInputFocus}>
              Description of the Training :
            </label>
            <br /> */}
            <input
              type="text"
              id="description"
              className={styles.description}
              value={description}
              placeholder="Write the Descriptions..."
              onChange={(e) => handleInputChange(e, setDescription)}
            />
          </div>

          <div className={styles.uploadDiv}>
            <input type="file" onChange={handleFileSelect} accept=".pdf" />
            <button className={styles.uploadButton} onClick={handleFileUpload}>
            ↑ Upload
            </button>
            <p className={styles.guideline}>(upload only .jpg or .pdf format)</p>
          </div>

          <br />
        </div>

        {/* Submit button */}
        <div className={styles.inputButton}>
          <button className={styles.formCloseButton} onClick={handleClose}>
            Close
          </button>
          <button className={styles.formSubmitButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
