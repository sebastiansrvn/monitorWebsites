import React, { useEffect, useState } from  'react';
import { Login as LoginAuth } from '../actions/auth';
import { Navigate } from "react-router-dom";

const Login = (isAuthenticated) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const { isLoggedIn, userInfo } = LoginAuth(username, password, submit);

    const handleChange = (e) => {
        if (e.target.name == "username") {
            setUsername(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        }
        setSubmit(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
    }
    
    const getErrors = () => {
        if (isLoggedIn === false && userInfo != undefined) {
            return (
                <div className="alert alert-danger" role="alert">
                    {userInfo}
                </div>
            );
        }
        return null;
    }
    

    if (isLoggedIn) {
        return <Navigate to="/" />
    }
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                    {getErrors()}
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <label htmlFor='username' className='form-label'><h5>Username</h5></label>
                        <input type='text' name='username' onChange={handleChange} className='form-control bg-light' id='username' placeholder='Enter your username.'/>
                        <label htmlFor='password' className='form-label mt-4'><h5>Password</h5></label>
                        <input type='password' name='password' onChange={handleChange} className='form-control bg-light' id='password' placeholder='Enter your password'/>
                        <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;