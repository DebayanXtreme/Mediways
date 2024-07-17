import React, { useState } from 'react';
import { database } from '../configuration/firebaseconfig.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css'; // Import styles from LoginForm.module.css
import signup from "./SignUp.jsx"
import { Link, useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const navigateTo = useNavigate();
  const handleLogin = async (e) => {
    setUserId(localStorage.getItem('userId'))

    
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(database, email, password);
      navigateTo("/");
      alert("User Logged in Successfully")
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text"
        placeholder="userId"
        value={userId}
        readOnly
        className={styles.inputField}
         />
        <input
          type="text"
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
        <p>New User? <Link to="/signup">Sign Up</Link></p>
        {error && <p className={styles.error}>{error}</p>} {/* Display error message if there's an error */}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default Login;
