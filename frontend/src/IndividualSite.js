import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";

class IndividualSite extends React.Component {
    loadTime = new Date().getTime();
    constructor(props) {
        super(props);
        this.state = {
            siteInfo: [],
            currTime: "0"
        }
    }
    getSiteInfo = async (siteID) => {
        this.loadTime = new Date().getTime();
        const response = await axios.get("/api/sites/" + siteID + "/get_status");
        this.setState({ siteInfo: response.data })
        this.updateTime();
        setInterval(this.updateTime, 1000 * 60)
    }

    updateTime = () => {
        this.setState({
            currTime : Math.abs(Math.round(((new Date().getTime() - this.loadTime) / 1000) / 60))
        })
    }
    
    componentDidMount() {
        if (this.props.siteID) {
            this.getSiteInfo(this.props.siteID);
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
                        <button onClick={() => this.getSiteInfo(this.props.siteID)} className='btn btn-dark'>Refresh <RefreshIcon /></button>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h1>{siteInfo.siteName}</h1>
                        <h5><a href={siteInfo.siteUrl} target="_blank" rel="noreferrer">{siteInfo.siteUrl}</a></h5>
                        <h5 className="mt-3">Current Status: <span>OK</span></h5>
                        <h5 className="mt-3">Last Checked: {this.state.currTime} minutes ago</h5>
                        <h5 className="mt-3">SSL Certificate Expiration Date: TBD</h5>
                        <h5>Status: { siteInfo.status ? <span className="text-success">Running</span>: <span className="text-danger">Down</span> }</h5>
                    </div>
                </div>
            </>
        }
    }
}

export default IndividualSite;