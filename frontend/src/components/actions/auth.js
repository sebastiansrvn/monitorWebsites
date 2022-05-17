import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_ERROR, USER_LOADED, USER_LOADING } from './types';


export const LoadUser = (token) => {
    const [returnObject, setReturnObject] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/auth/user", config);
                setReturnObject(res.data)
                setIsAuthenticated(true);
            } catch (err) {                
                setReturnObject(err.response.data)
                setIsAuthenticated(true);
            }
        }
        getData();
    }, []);

    return {returnObject, isAuthenticated};
}

export const Register = (username, email, password, isSubmitted) => {
    const [returnObject, setReturnObject] = useState();
    const [success, setSuccess] = useState();
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
                setSuccess(true);
            } catch (err) {
                setReturnObject(err.response.data);
                setSuccess(false);
            }
        }
        
        registerUser();
    }, [isSubmitted]);
        
    return {returnObject, success};
  };

// export const LoadUser = (token) => {
//     const [returnObject, setReturnObject] = useState();
//     const [isAuthenticated, setIsAuthenticated] = useState();
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     };
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/auth/user", config)
//         .then((res) => {
//             setReturnObject(res.data);
//             setIsAuthenticated(true);
//         })
//         .catch((err) => {
//             setReturnObject(err.response.data);
//             setIsAuthenticated(true)
//         });
//     }, []);

//     if (returnObject === undefined && isAuthenticated === undefined) {
//         return {returnObject: null, isAuthenticated: null}; 
//     } else {
//         return {returnObject, isAuthenticated};
//     }
// }
