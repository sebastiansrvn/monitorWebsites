import { formControlLabelClasses, Typography } from '@mui/material';
import React from 'react';
import Table from './Table';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      siteList: []
    }
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("/api/sites")
    .then((res) => this.setState({ siteList: res.data }))
    .catch((err) => console.log(err))
  }

  getTableInfo = (table) => {
    const tableInfo = this.state.siteList
    if (tableInfo.length < 1) {
      return [[],[]];
    }
    console.log(tableInfo)
    const toReturn = [[],[]];
    switch (table) {
      case "Status":
        toReturn[0] = ['Name', "Site", "Status", "Date"];
        toReturn[1] = [];
        tableInfo.forEach(function(info) {
          // alert(info.status)
          const status = info.status ? "Active" : "Down";
          toReturn[1].push([info.id, info.siteName, info.siteLink, status, "Now"]);
        });
        break;
      case "SSL Certificates":
          toReturn[0] = ['Name', "Site", "Expires On"];
          toReturn[1] = [];
          tableInfo.forEach(function(info) {
            toReturn[1].push([info.id, info.siteName, info.siteLink, info.sslCertificate]);
          });
          break;

      case "Alerts":
          toReturn[0] = ['Name', "Site", "Notification"];
          toReturn[1] = [];
          tableInfo.forEach(function(info) {
            toReturn[1].push([info.id, info.siteName, info.siteLink, "ALERT"]);
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
    // const headers = this.headersStatus
    // const rows = this.rowsStatus

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
    return (
      <div className='row mt-3'>
        <div className='col-md-12'>
          {this.getTable(this.props.option, this.props.updatePage)}
        </div>
      </div>
    )
  }
}


export default Home