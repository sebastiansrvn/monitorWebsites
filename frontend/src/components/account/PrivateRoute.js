import React from 'react';
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ currentPage, isAuthenticated, isLoading }) => {
    if (isLoading) {
        return <h1>Logging in...</h1>
    } else if (!isAuthenticated) {
        return <Navigate to="/login" />
    } else {
        return currentPage
    }
}

export default PrivateRoute;