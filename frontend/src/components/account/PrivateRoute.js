import React from 'react';
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ currentPage, isLoading }) => {
    if (isLoading) {
        return <h1>Logging in...</h1>
    } else if (sessionStorage.getItem("logged")) {
        return currentPage
    } else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoute;