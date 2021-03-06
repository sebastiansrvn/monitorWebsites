import { Typography } from '@mui/material';
import React from 'react';
import Table from './Table';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios'
import RefreshIcon from '@mui/icons-material/Refresh';
import { tokenConfig } from "./helper/TokenConfig";

class Main extends React.Component {
  loadTime = new Date().getTime();
  timerInterval;
  constructor(props) {
    super(props)
    this.state = {
      siteList: [],
      siteAlerts: [],
      siteStatus: {},
      sitesSSL: {},
      currTime: 0,
    }
  };

  componentDidMount() {
    this.refreshList();
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  refreshList = async () => {
    this.loadTime = new Date().getTime();
    const sitesResponse = await axios.get("http://localhost:8000/api/sites", tokenConfig(sessionStorage.getItem("authToken")));
    const allSitesInfo = await axios.post("http://localhost:8000/api/sites/0/get_all_sites_info/", sitesResponse.data, tokenConfig(sessionStorage.getItem("authToken")));
    this.setState({ siteList: sitesResponse.data })
    this.setState({ siteStatus: allSitesInfo.data.status })
    this.setState({ siteAlerts: allSitesInfo.data.alerts })
    this.setState({ sitesSSL: allSitesInfo.data.ssl })
    this.updateTime();
    this.timerInterval = setInterval(this.updateTime, 1000 * 60);
  }

  updateTime = () => {
    this.setState({
      currTime : Math.abs(Math.round(((new Date().getTime() - this.loadTime) / 1000) / 60))
    });
  }
  
  getTableInfo = (table) => {
    const tableInfo = this.state.siteList;
    const alerts = this.state.siteAlerts;
    const siteStatus = this.state.siteStatus;
    const sitesSSL = this.state.sitesSSL;
    if (tableInfo.length < 1) {
      return [[],[]];
    }
    const toReturn = [[],[]];
    switch (table) {
      case "Status":
        toReturn[0] = ['Name', "Site", "Status"];
        toReturn[1] = [];
        tableInfo.forEach(function(info) {
          var status = "Down"
          var bgColor = "bg-danger"
          if (siteStatus[info.id]) {
            status = "Running"
            bgColor = "bg-success"
          }
          toReturn[1].push([[info.id], [info.siteName], [info.siteLink], [status, bgColor]]);
        });
        break;
      case "SSL Certificates":
          toReturn[0] = ['Name', "Site", "Expires On"];
          toReturn[1] = [];
          tableInfo.forEach(function(info) {
            var bgColor = "bg-success"
            if (sitesSSL[info.id]  < 200) {
              bgColor = "bg-danger"
            } else if (sitesSSL[info.id] < 300) {
              bgColor = "bg-warning"
            }
            toReturn[1].push([[info.id], [info.siteName], [info.siteLink], [(sitesSSL[info.id] + " days"), bgColor]]);
          });
          break;

      case "Alerts":
          toReturn[0] = ['Name', "Notification"];
          toReturn[1] = [];
          alerts.forEach(function(alert) {
            toReturn[1].push([[alert.id], [alert.siteName], [alert.message]]);
          });
          break;
      default:
          break;
        }
      return toReturn;  
  }

  getTable = (tableOption, updatePage) => {
    const tableInfo = this.getTableInfo(tableOption)
    const headers = tableInfo[0]
    const rows = tableInfo[1]
    return <>
      <Typography align="center" variant="h3">{tableOption}<PublicIcon style={{ marginLeft: 10, verticalAlign: "middle", fontSize: 40 }}/></Typography>
      <h5 className='text-center'>Last Updated: {this.state.currTime} minutes ago. <button className='btn btn-dark' onClick={this.refreshList}>Refresh <RefreshIcon /></button></h5>
      <Table updatePage={updatePage} headers={headers} rows={rows} />
    </>;
  }
  
  render(props) {
    if (this.state.siteList == undefined) {
      return (
        <div className='row mt-3'>
          <div className='col-md-12'>
            <Typography align="center" variant="h3">Loading...</Typography>
          </div>
        </div>
      )
    } else if (this.state.siteList.length === 0) {
      return (
        <div className='row mt-3'>
          <div className='col-md-12'>
          <Typography align="center" variant="h3">No Sites Available</Typography>
          </div>
        </div>
      )
    } else {
      return (
        <div className='row mt-3'>
          <div className='col-md-12'>
            {this.getTable(this.props.option, this.props.updatePage)}
          </div>
        </div>
      )
    }
  }
}


export default Main