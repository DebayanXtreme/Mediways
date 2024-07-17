import React, { useState, useEffect } from 'react';
import styles from './nearby.module.css'; // Import the CSS file
import Navbar from "../Navbar";
import kalyani from "./kalyani.jpg"
import mylocation from "./mylocation.jpg"


const nearbyPlaces = [
  // Add your place data here in this format
  { id: 1, name: "Sushrut Hospital",ph:"03325827777", address:"A98/4 CA, Kalyani Station Rd, Kalyani, West Bengal 741235" },
  { id: 2, name: "Apex Hospital kalyani",ph:"no contact details", address:"XFC7+7MP Apex hospital, kalyani, Block A9, Block A, Kalyani, West Bengal 741234" },
  { id: 3, name: "Jaymala Memorial Hospital",ph:"08296463015",address:"A-1/2(C.A, A1, Block A1, Block A, Kalyani, West Bengal 741235"},
  { id: 4, name: "Baishakhi Hospital Kly",ph:"No contact details", address:"Q4(S, Kalyani Station Rd, A 9X, Block A9, Block A, Kalyani, West Bengal 741235"}
  // ... more places
];

function NearbyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(nearbyPlaces);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [itemView, setItemView] = useState(false);
  const [imageView, setImageView] = useState(mylocation);
  
  useEffect(() => {
    const filtered = nearbyPlaces.filter((place) =>
      place.name.toLowerCase()
    );
    setFilteredPlaces(filtered);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSetImage = () => {
    // Validate the search term to ensure it ends with '.jpg'
    if(searchTerm){
        setItemView(true)
        setImageView(kalyani)
    }
    setImagePath(`assets/${searchTerm}.jpg`);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className={styles.nearby_page}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
      <div className={styles.search_and_pictures}>
        <input
          type="text"
          placeholder="Search for nearby places..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.search_bar}
        />
        <div className={styles.buttonDiv}>
            <button onClick={handleSetImage} className={styles.set_image_button}>
            Search
            </button>
        </div>
        
        <div className={styles.pictures}>
          {/* Add your image logic here */}
          {/* You can use a loop to iterate through image paths and display them */}
          {/* Conditionally render the image based on imagePath */}
          { <img src={imageView} alt={searchTerm} className={styles.image} />}
        </div>
      </div>
       <div className={styles.list_container}>
        <div className={styles.itemHeading}>
            Nearby Hospitals
        </div>
       {itemView &&<ul className={styles.place_list}>
          {filteredPlaces.map((place) => (
            <li key={place.id} className={styles.place_item} onClick={() => handleItemClick(place)}>
              {place.name}
            </li>
          ))}
        </ul>}
      </div>
      {selectedItem && (
        <div className={styles.modal}>
            <div className={styles.divModal}>
                <p className={styles.modalText}>{selectedItem.address}</p>
                <p className={styles.modalText}>{selectedItem.ph}</p>
                {/* Add more details about the selected place here */}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default NearbyPage;
