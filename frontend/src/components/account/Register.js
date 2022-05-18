import React, { useState } from "react";
import { Register as RegisterAuth } from  "../actions/auth";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isRegistered, returnObject } = RegisterAuth(username, email, password, isSubmitted);

    const handleChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "passwordConfirmation") {
            setPasswordConfirmation(e.target.value);
        }
        setIsSubmitted(false);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === passwordConfirmation) {
            setIsSubmitted(true);
        } else {
            alert("Make sure your passwords are equal.");
        }
    }

    const getErrors = () => {
        if (isRegistered === false) {
            return (
                <div className="alert alert-danger" role="alert">
                    {returnObject.username} <br />
                    {returnObject.email} <br />
                    {returnObject.password}
                </div>
            );
        }

        return null;
    }

    if (isRegistered) {
        return <Navigate to="/" />
    }

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                    {getErrors()}
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <label htmlFor='email' className='form-label'><h5>Email</h5></label>
                        <input type='text' name='email' onChange={handleChange} className='form-control bg-light' id='email' placeholder='Enter your email.'/>
                        <label htmlFor='username' className='form-label mt-4'><h5>Username</h5></label>
                        <input type='text' name='username' onChange={handleChange} className='form-control bg-light' id='username' placeholder='Enter your email.'/>
                        <label htmlFor='password' className='form-label mt-4'><h5>Password</h5></label>
                        <input type='password' name='password' onChange={handleChange} className='form-control bg-light' id='password' placeholder='Enter your password'/>
                        <label htmlFor='confirmPassword' className='form-label mt-4'><h5>Confirm Your Password</h5></label>
                        <input type='password' name='passwordConfirmation' onChange={handleChange} className='form-control bg-light' id='passwordConfirmation' placeholder='Confirm your password'/>
                        <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;