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
import { LoadUser } from './components/actions/auth';


function Monitor() {
  const [currentPage, setCurrentPage] = useState('Alerts');
  const [individualSite, setIndividualSite] = useState(null);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const loadUser = LoadUser();
  
  useEffect(() => {
    setUser(loadUser.returnObject);
    setIsAuthenticated(loadUser.isAuthenticated);
    document.body.style.backgroundColor = "#FAFAFA";
  }, []);
  
  function updatePage(curr, site) {
    setCurrentPage(curr);
    setIndividualSite(site);
  }
  
  function getPageOption(option) {
    if (option === "Status" || option === "SSL Certificates" || option === "Alerts") {
      return <TableDisplay option={option} updatePage={updatePage}/>;
    } else if (option === "Add") {
      return <Add returnToStatus={updatePage}/>;
    } else if (option === "Individual Site") {
      return <IndividualSite returnToStatus={updatePage} siteID={this.state.individualSite}/>
    } else {
      return <h1>Not Found</h1>
    }
  }
  console.log(isAuthenticated)
  
  return (
    <Router>
      <div className="App">
        <NavBar updatePage={updatePage}/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={ <PrivateRoute isLoading={false} isAuthenticated={isAuthenticated} currentPage={getPageOption(currentPage)} /> } />
            <Route exact path="/register" element={ <Register/> } />
            <Route exact path="/login" element={ <Login/> } />
          </Routes>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous"></script>
      </div>
    </Router>
  );
}

// class Monitor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPage: 'Alerts',
//       individualSite: null,
//       user: null,
//       userType: null
//     }
//   }

  // Handles content when clicking navbar
  // updatePage = (curr, site) => {
  //   this.setState({
  //     currentPage: curr,
  //     individualSite: site
  //   });
  // }

  // getPageOption = (option) => {
  //   if (option === "Status" || option === "SSL Certificates" || option === "Alerts") {
  //     return <TableDisplay option={option} updatePage={this.updatePage}/>;
  //   } else if (option === "Add") {
  //     return <Add returnToStatus={this.updatePage}/>;
  //   } else if (option === "Individual Site") {
  //     return <IndividualSite returnToStatus={this.updatePage} siteID={this.state.individualSite}/>
  //   } else {
  //     return <h1>Not Found</h1>
  //   }
  // }

  // componentDidMount = () => {
  //   document.body.style.backgroundColor = "#FAFAFA"
  // }

  // getUserData = () => {
    
  // }

  // render() {
  //   return (
  //     <Router>
  //       <div className="App">
  //         <NavBar updatePage={this.updatePage}/>
  //         <div className='container'>
  //           <Routes>
  //             <Route exact path="/" element={ <PrivateRoute isLoading={false} isAuthenticated={false} currentPage={this.getPageOption(this.state.currentPage)} /> } />
  //             <Route exact path="/register" element={ <Register/> } />
  //             <Route exact path="/login" element={ <Login/> } />
  //           </Routes>
  //         </div>
  //         <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous"></script>
  //         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous"></script>
  //       </div>
  //     </Router>
  //   );
  // }
// }

export default Monitor;