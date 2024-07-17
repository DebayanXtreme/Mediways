import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Admin.module.css";
const EditModal = ({ closeModal, show, fetchData, training, children }) => {
  const convetTimestampToDate = (timestamp) => {
    const dateObject = new Date(timestamp);

    // Get the components of the date
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = dateObject.getDate().toString().padStart(2, "0");
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    // Format the date in the datetime-local format
    const formattedDatetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    return formattedDatetimeLocal;
  };

  const [name, setName] = useState(training.name);
  const [description, setDescription] = useState(training.description);
  const [dateTimeStart, setDateStart] = useState(
    convetTimestampToDate(training.date_time_start)
  );
  const [dateTimeEnd, setDateEnd] = useState(
    convetTimestampToDate(training.date_time_end)
  );
  const [totalSlots, settotalSlots] = useState(training.total_slots);
  // const inputRef = useRef(null);

  const handleInputChange = (event, setInputValue) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    // Set the scroll position to the top when the input is focused
    if (inputRef.current) {
      inputRef.current.scrollTop = 0;
    }
  };

  const showToast = (message) => {
    if (message.success) toast.success(message.success);
    else if (message.error) toast.error(message.error);
  };
  const handleSubmit = async () => {
    try {
      if (name.trim() === "") {
        // alert("Some Important Field(s) may be empty!");
        showToast({ error: "Some Important Field(s) may be empty!" });
      } else {
        const response = await fetch(
          `http://localhost:5000/admin/trainings/${training.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              description,
              totalSlots,
              dateTimeStart,
              dateTimeEnd,
            }),
          }
        );

        const data = await response.json();

        console.log(data);
        if (data) {
          showToast({ success: "Data Edited" });
          console.log("Data Edited successfully");
          // alert(name + " added successfully");

          setName("");
          setDateStart(new Date());
          setDateEnd(new Date());
          settotalSlots("");
          setDescription("");
          fetchData();
          closeModal();
        } else {
          showToast({ error: data.error });
          console.error("Error inserting data:", data);
        }
      }
    } catch (error) {
      showToast({ error: error.message });
      console.error("Error inserting data:", error);
    }
  };

  // const showHideClassName = show
  //   ? "styles.modal display-block"
  //   : "styles.modal display-none";
  const showStyle = show ? { display: "block" } : { display: "none" };
  return (
    <div className={styles.modal} style={showStyle}>
      {/* {console.log(training)} */}
      <section className={styles.modal_main}>
        {children}
        <h1 className={styles.formTitle1}>Edit</h1>
        <h1 className={styles.formTitle2}>Training</h1>
        <div className={styles.inputDiv}>

          <div>
            {/* <label htmlFor="name">Name :</label>
            <br /> */}
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter the Training Name"
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
          <h1 className={styles.dateDiv}>&gt;</h1>
          <div className={styles.dateDiv}>
            {/* <label htmlFor="date">End Date Time</label>
            <br /> */}
            <input
              type="datetime-local"
              id="date"
              className={styles.dateEnd}
              value={dateTimeEnd}
              onChange={(e) => handleInputChange(e, setDateEnd)}
            />
          </div>
          <div>
            {/* <label htmlFor="totalSlots">totalSlots of Candidates :</label>
            <br /> */}
            <input
              type="number"
              id="totalSlots"
              value={totalSlots}
              placeholder="Total Candidates"
              onChange={(e) => handleInputChange(e, settotalSlots)}
            />
          </div>
          <div>
            {/* <label htmlFor="description" onFocus={handleInputFocus}>
              Description of the Training :
            </label>
            <br /> */}
            <input
              type="text"
              // id="description"
              className={styles.description}
              value={description}
              placeholder="Write the Descriptions..."
              onChange={(e) => handleInputChange(e, setDescription)}
            />
          </div>

          <br />
        </div>

        {/* Submit button */}
        <div className={styles.inputButton}>
          <button className={styles.formCloseButton} onClick={closeModal}>
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

export default EditModal;
