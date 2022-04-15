import { Typography } from '@mui/material';
import React from 'react';
import Table from './Table';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios'
import RefreshIcon from '@mui/icons-material/Refresh';

class Home extends React.Component {
  loadTime = new Date().getTime();
  constructor(props) {
    super(props)
    this.state = {
      siteList: [],
      currTime: 0
    }
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = async () => {
    this.loadTime = new Date().getTime();
    const response = await axios.get("/api/sites/0/get_all");
    this.setState({ siteList: response.data })
    this.updateTime();
    setInterval(this.updateTime, 60 * 1000);
  }

  updateTime = () => {
    this.setState({
      currTime : Math.abs(Math.round(((new Date().getTime() - this.loadTime) / 1000) / 60))
    })
  }
  
  getTableInfo = (table) => {
    const tableInfo = this.state.siteList
    if (tableInfo.length < 1) {
      return [[],[]];
    }
    const toReturn = [[],[]];
    switch (table) {
      case "Status":
        const time = this.state.currTime + " mins"
        toReturn[0] = ['Name', "Site", "Status"];
        toReturn[1] = [];
        tableInfo.forEach(function(info) {
          var status = "Down"
          var bgColor = "bg-danger"
          if (info.siteIsUp) {
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
            toReturn[1].push([[info.id], [info.siteName], [info.siteLink], ["TBD"]]);
          });
          break;

      case "Alerts":
          toReturn[0] = ['Name', "Site", "Notification"];
          toReturn[1] = [];
          tableInfo.forEach(function(info) {
            toReturn[1].push([[info.id], [info.siteName], [info.siteLink], ["ALERT"]]);
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
    if (this.state.siteList.length == 0) {
      return (
        <div className='row mt-3'>
          <div className='col-md-12'>
            <Typography align="center" variant="h3">Loading...</Typography>
          </div>
        </div>
      )
    } else {
      return (
        <div className='row mt-3'>
          <div className='col-md-12'>
            {/* <h5 className='text-center'>Last Updated: {this.state.currTime} minutes ago.</h5> */}
            {/* <Table updatePage={this.props.updatePage} headers={headers} rows={rows} /> */}
            {this.getTable(this.props.option, this.props.updatePage)}
          </div>
        </div>
      )
    }
  }
}


export default Home