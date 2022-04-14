import { formControlLabelClasses, Typography } from '@mui/material';
import React from 'react';
import Table from './Table';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siteList: [],
      currTime: 0
    }
  };

  componentDidMount() {
    this.refreshList()
    setInterval(() => {
      this.setState({
        currTime : Math.abs(Math.round(((new Date().getTime() - this.loadTime) / 1000) / 60))
      })
    }, 60 * 1000)
  }

  refreshList = async () => {
    const response = await axios.get("/api/sites/0/get_all");
    this.setState({ siteList: response.data })
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
        toReturn[0] = ['Name', "Site", "Status", "Last Updated"];
        toReturn[1] = [];
        tableInfo.forEach(function(info) {
          var status = "Down"
          var bgColor = "bg-danger"
          if (info.siteIsUp) {
            status = "Running"
            bgColor = "bg-success"
          }
          toReturn[1].push([[info.id], [info.siteName], [info.siteLink], [status, bgColor], [time]]);
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

    switch (tableOption) {
      case "Status":
        return <>
            <Typography align="center" variant="h3">Status<PublicIcon style={{ marginLeft: 10, verticalAlign: "middle", fontSize: 40 }}/></Typography>
            <Table updatePage={updatePage} headers={headers} rows={rows} />
        </>

      case "SSL Certificates":
        return <>
          <Typography align="center" variant="h3">SSL Certificates<PublicIcon style={{ marginLeft: 10, verticalAlign: "middle", fontSize: 40 }}/></Typography>
          <Table updatePage={updatePage} headers={headers} rows={rows} />
        </>

      case "Alerts":
        return <>
          <Typography align="center" variant="h3">Alerts<PublicIcon style={{ marginLeft: 10, verticalAlign: "middle", fontSize: 40 }}/></Typography>
          <Table updatePage={updatePage} headers={headers} rows={rows} />
        </>

      default:
        return <h1>Not Found</h1>
    }
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
            {this.getTable(this.props.option, this.props.updatePage)}
          </div>
        </div>
      )
    }
  }
}


export default Home