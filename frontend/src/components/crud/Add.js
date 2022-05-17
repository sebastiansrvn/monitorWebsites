import React from 'react';
import axios from 'axios'
import { tokenConfig } from "../helper/TokenConfig";

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteLink: "",
            siteName: "",
            description: "N/A",
            returnToStatus: props.returnToStatus,
        }
    }

    handleChange = (e) => {
        var { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        axios.post("http://localhost:8000/api/sites/", this.state, tokenConfig("7d82b5880fb5c96d7ad0336eb48efa96bfe769cd4780d4b3725fac5dbcc19ced"))
        .then()
        this.state.returnToStatus("Alerts")
        e.preventDefault();
    }

    render() {
        return <>
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor='site-name' className='form-label'><h5>Name</h5></label>
                            <input type='text' name='siteName' onChange={this.handleChange} className='form-control bg-light' id='site-name' placeholder='Enter your site name.'/>
                            <label htmlFor='site-url' className='form-label mt-4'><h5>Site URL</h5></label>
                            <input type='url' name='siteLink' onChange={this.handleChange} className='form-control bg-light' id='site-url' placeholder='https://example.com'/>
                            <label htmlFor='description' className='form-label mt-4'><h5>Description</h5></label>
                            <textarea name='description' onChange={this.handleChange} className='form-control bg-light' id='site-url' placeholder='Enter your site description.'/>
                            <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Add