import React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Edit from "./components/Edit";
import ResponseTimes from "./components/ResponseTimes";


class IndividualSite extends React.Component {
    loadTime = new Date().getTime();
    timerInterval;
    constructor(props) {
        super(props);
        this.state = {
            siteInfo: [],
            responseTimes: [],
            currTime: "0",
            show: false,
            editing: false,
        }
    }

    confirmationModal = (siteID, returnToStatus) => {
        return (
            <Modal centered show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => this.handleDelete(siteID, returnToStatus)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
    
    getSiteInfo = async (siteID) => {
        this.loadTime = new Date().getTime();
        const siteInfo = await axios.get("http://localhost:8000/api/sites/" + siteID + "/get_status_single");
        const responseTimes = await axios.get("http://localhost:8000/api/responseTimes/" + siteID + "/get_response_times")
        this.setState({ siteInfo: siteInfo.data })
        this.setState({ responseTimes: responseTimes.data.responseTimes })
        this.updateTime();
        this.timerInterval = setInterval(this.updateTime, 1000 * 60);
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
    
    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }
    
    handleEdit = (args) => {
        axios.post("http://localhost:8000/api/sites/" + this.props.siteID + "/update_record/", args)
        .then()
        this.props.returnToStatus("Alerts")
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    handleOpen = () => {
        this.setState({ show: true })
    }

    handleDelete = async (siteID, updatePage) => {
        await axios.get("http://localhost:8000/api/sites/" + siteID + "/delete_record");
        updatePage("Status");
    }

    render() {
        const siteInfo = this.state.siteInfo;
        const responseTimes = this.state.responseTimes
        if (this.state.editing) {
            return (
                <Edit siteName={siteInfo.siteName} siteLink={siteInfo.siteLink} description={siteInfo.description} handleEdit={this.handleEdit}/>
            )
        } else {
            if (siteInfo.length === 0) {
                return (
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h1>Loading...</h1>
                        </div>
                    </div>
                )
            } else {
                var sslColor = "text-success"
                if (siteInfo.sslExpiresIn  < 200) {
                  sslColor = "text-danger"
                } else if (siteInfo.sslExpiresIn < 300) {
                  sslColor = "text-warning"
                }
                return <>
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <button onClick={() => this.getSiteInfo(this.props.siteID)} className='btn btn-dark w-100'>Refresh <RefreshIcon /></button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-danger w-100" onClick={this.handleOpen}>Delete</button>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-warning w-100" onClick={() => this.setState({ editing: true })}>Edit</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h1>{siteInfo.siteName}</h1>
                            <h5><a href={siteInfo.siteLink} target="_blank" rel="noreferrer">{siteInfo.siteLink}</a></h5>
                            <h5 className="mt-3">Current Status: <span>OK</span></h5>
                            <h5 className="mt-3">Description: {siteInfo.description}</h5>
                            <h5 className="mt-3">Last Checked: {this.state.currTime} minutes ago</h5>
                            <h5 className="mt-3">SSL Certificate Expiration Date: <span className={sslColor}>{siteInfo.sslExpiresIn} days</span></h5>
                            <h5>Status: { siteInfo.status ? <span className="text-success">Running</span>: <span className="text-danger">Down</span> }</h5>
                        </div>
                    </div>
                    {this.confirmationModal(this.props.siteID, this.props.returnToStatus)}
                </>
                }
        }
    }
}

export default IndividualSite;