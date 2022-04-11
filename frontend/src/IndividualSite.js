import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";

class IndividualSite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteInfo: [],
        }
    }
    setIndividualSiteInfo = (siteID) => {
        axios.get("/api/sites/" + siteID + "/get_status")
        .then((res) => this.setState({ siteInfo: res.data }))
        .catch((err) => console.log(err))
    }
    
    componentDidMount() {
        if (this.props.siteID) {
            this.setIndividualSiteInfo(this.props.siteID);
        }
    }
    render() {
        const siteInfo = this.state.siteInfo;
        if (siteInfo.length == 0) {
            return (
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h1>Loading...</h1>
                    </div>
                </div>
            )
        } else {
            return <>
                <div className="row mt-3">
                    <div className="col-md-4">
                        <button style={{ backgroundColor: '#0d1821' }} className='btn text-white'>Refresh <RefreshIcon /></button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h1>{siteInfo.siteName}</h1>
                        <h5><a href={siteInfo.siteUrl} target="_blank" rel="noreferrer">{siteInfo.siteUrl}</a></h5>
                        <h5 className="mt-3">Current Status: <span>OK</span></h5>
                        <h5 className="mt-3">Last Checked: <span>NOW</span></h5>
                        <h5 className="mt-3">SSL Certificate Expiration Date: {siteInfo.sslDate}</h5>
                        { siteInfo.status ? <h5>Status: Running</h5> : <h5>Status: Down</h5> }
                    </div>
                </div>
            </>
        }
    }
}

export default IndividualSite;