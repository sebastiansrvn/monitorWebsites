import './css/App.css'
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar'
import TableDisplay from './components/TableDisplay';
import Add from './components/crud/Add';
import Login from './components/account/Login';
import Register from './components/account/Register';
import IndividualSite from './components/IndividualSite'
import PrivateRoute from './components/account/PrivateRoute';
import { HashRouter as Router, Route, Routes, Redirect } from "react-router-dom";
import { LoadUser, Logout } from './components/actions/auth';


const Monitor = () => {
  const [currentPage, setCurrentPage] = useState('Alerts');
  const [individualSite, setIndividualSite] = useState(null);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLogginOut, setIsloggingOut] = useState(null);

  const isLoggedOut  = Logout(sessionStorage.getItem("authToken"), isLogginOut);
  if (isLoggedOut) {
    // setIsAuthenticated(false);
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#FAFAFA";
  });
  
  const loadUserInfo = async () => {
    const userInfo = await LoadUser(sessionStorage.getItem("authToken"));
    setUser(userInfo.returnObject);
    setIsAuthenticated(userInfo.isAuthenticated);
  }
  loadUserInfo();

  const logOut = (submit) => {
    setIsloggingOut(true);
  }

  const updatePage = (curr, site) => {
    setCurrentPage(curr);
    setIndividualSite(site);
  }
  
  const getPageOption = (option) => {
    if (option === "Status" || option === "SSL Certificates" || option === "Alerts") {
      return <TableDisplay option={option} updatePage={updatePage}/>;
    } else if (option === "Add") {
      return <Add returnToStatus={updatePage}/>;
    } else if (option === "Individual Site") {
      return <IndividualSite returnToStatus={updatePage} siteID={individualSite}/>
    } else {
      return <h1>Not Found</h1>
    }
  }
  
  if (user == undefined || isAuthenticated == undefined) {
    return null;
  }

  return (
    <Router>
      <div className="App">
        <NavBar updatePage={updatePage} logOut={logOut}/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={ <PrivateRoute isLoading={false} isAuthenticated={isAuthenticated} currentPage={getPageOption(currentPage)} /> } />
            <Route exact path="/register" element={ <Register isAuthenticated={isAuthenticated} /> } />
            <Route exact path="/login" element={ <Login isAuthenticated={isAuthenticated} /> } />
          </Routes>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous"></script>
      </div>
    </Router>
  );
}

export default Monitor;