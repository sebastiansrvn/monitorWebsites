import './css/App.css'
import React from 'react';
import NavBar from './components/NavBar'
import Main from './Main';
import Add from './Add';
import Login from './Login';
import Register from './Register';
import IndividualSite from './IndividualSite'


class Monitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Alerts',
      individualSite: null
    }
  }

  // Handles content when clicking navbar
  updatePage = (curr, site) => {
    this.setState({
      currentPage: curr,
      individualSite: site
    });
  }

  getPageOption = (option) => {
    if (option === "Status" || option === "SSL Certificates" || option === "Alerts") {
      return <Main option={option} updatePage={this.updatePage}/>;
    } else if (option === "Add") {
      return <Add returnToStatus={this.updatePage}/>;
    } else if (option === "Individual Site") {
      return <IndividualSite returnToStatus={this.updatePage} siteID={this.state.individualSite}/>
    } else if (option === "Login") {
      return <Login />
    } else if (option === "Register") {
      return <Register />  
    } else {
      return <h1>Not Found</h1>
    }
  }
  componentDidMount = () => {
    document.body.style.backgroundColor = "#FAFAFA"
}
  render() {
    return (
      <div className="App">
        <NavBar updatePage={this.updatePage}/>
        <div className='container'>
          { this.getPageOption(this.state.currentPage) }
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossOrigin="anonymous"></script>
      </div>
    );
  }
}

export default Monitor;