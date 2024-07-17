import React, { useState } from 'react';
import { database,databases } from '../configuration/firebaseconfig.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './SignUp.module.css'; // Import styles from SignUp.module.css
import { push, ref } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const[phone,setPhone]=useState('');
  const [user,setUserType]=useState('');

  const navigateTo = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {

    const userRef = ref(databases, 'users');
    const newUserRef = push(userRef);
      await createUserWithEmailAndPassword(database, email, password, {
        name: name,
        phone:phone,
        age: age,
        gender: gender,
        user:user
        
      }).then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "User Data");
        const userId = newUserRef.key;
      alert(`Your user ID is: ${userId}`);
      localStorage.setItem('userId', userId)
      navigateTo("/login");




      });
    } catch (error) {
      alert(error.message);
    }
  };

 

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.inputField}
        />
         <input
          type="number"
          placeholder="Phone No"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={styles.inputField}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={styles.inputField}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />

        <input type="radio"
        id="doctor"
        name="userType"
        value="doctor"
        checked={user === "doctor"}
        onChange={() => setUserType("doctor")}

         />
         <label htmlFor="doctor">Doctor</label>

         <input type="radio" 
          id="patient"
          name="userType"
          value="patient"
          checked={user === "patient"}
          onChange={() => setUserType("patient")}
          />
          <label htmlFor="patient">Patient</label>

          <p>Already have an account? <Link to="/login">Login</Link></p>        
        
      
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;