import React from 'react';
import axios from 'axios';
import { USER_ERROR, USER_LOADED, USER_LOADING } from './types';


const loadUser = async (token) => {
    const toReturn = {
        "returnObject": null,
        "returnType": null
    };
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    try {
        const res = await axios.get('http://localhost:8000/api/auth/user', config)
        // toReturn =  {returnObject: res.data, returnType: USER_LOADED};
        toReturn["returnObject"] = res.data;
        toReturn["returnType"] = USER_LOADED; 
    } catch (error) {
        // toReturn =  {returnObject: error.response.data, returnType: USER_ERROR};
        toReturn["returnObject"] = error.response.data;
        toReturn["returnType"] = USER_ERROR; 
    }
    return toReturn;
}

export default loadUser;