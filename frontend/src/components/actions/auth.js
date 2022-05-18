import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_ERROR, USER_LOADED, USER_LOADING } from './types';


export const LoadUser = (token) => {
    const [returnObject, setReturnObject] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/auth/user", config);
                setReturnObject(res.data)
                setIsAuthenticated(true);
            } catch (err) {                
                setReturnObject(err.response.data)
                setIsAuthenticated(false);
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("logged");
            }
        }
        getData();
    }, []);
    return { returnObject, isAuthenticated };
}

export const Login = (username, password, submit) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ username, password });
    useEffect(() => {
        if (!submit) {
            return;
        }
        const getData = async () => {
            try {
                const res = await axios.post("http://localhost:8000/api/auth/login", body, config);
                setIsLoggedIn(true);
                sessionStorage.setItem("authToken", res.data.token)
                sessionStorage.setItem("logged", true)
                setUserInfo(res.data);
            } catch (err) {
                setIsLoggedIn(false);
                setUserInfo(err.response.data.non_field_errors[0]);
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("logged");
            }
        }
        getData();
    }, [submit]); 

    return {isLoggedIn, userInfo}
}

export const Register = (username, email, password, isSubmitted) => {
    const [returnObject, setReturnObject] = useState();
    const [isRegistered, setIsRegistered] = useState();
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ username, email, password });

    useEffect(() => {
        if (!isSubmitted) {
            return;
        }
        
        const registerUser = async () => {
            try {
                const res = await axios.post("http://localhost:8000/api/auth/register", body, config);
                setReturnObject(res);
                setIsRegistered(true);
                sessionStorage.setItem("authToken", res.data.token)
                sessionStorage.setItem("logged", true)
            } catch (err) {
                setReturnObject(err.response.data);
                setIsRegistered(false);
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("logged");
            }
        }
        
        registerUser();
    }, [isSubmitted]);
        
    return { isRegistered, returnObject };
  };

export const Logout = (token, submit) => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      if (token) {
        config.headers['Authorization'] = `Token ${token}`;
      }

      useEffect(() => {
        if (!submit) {
            return;
        }
        const getData = async () => {
            try {
                const res = await axios.post('http://localhost:8000/api/auth/logout', null, config);
                sessionStorage.removeItem("logged");
                sessionStorage.removeItem("authToken");
                setIsLoggedOut(true);
            } catch (err) {
                setIsLoggedOut(false);
            }
        }
        getData();
    }, [submit]); 
      return isLoggedOut;
}