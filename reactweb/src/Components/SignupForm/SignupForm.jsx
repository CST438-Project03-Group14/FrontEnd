import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { FaUser, FaLock } from "react-icons/fa";

const SignupForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        navigate('/');
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className={styles.inputBox}>
                    <input 
                        type="text" 
                        placeholder='Username' 
                        required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className={styles.icon} />
                </div>
                <div className={styles.inputBox}>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className={styles.icon}/>
                </div>
                <div className={styles.inputBox}>
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FaLock className={styles.icon}/>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Create Account</button>
            </form>
            <button 
                onClick={() => navigate('/')} 
                className={styles.backToLoginButton}
            >
                Back to Login
            </button>
        </div>
    );
};

export default SignupForm;