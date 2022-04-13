import React from 'react';
import axios from 'axios'

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteLink: "",
            siteName: "",
            description: "N/A",
        }
    }
    handleChange = (e) => {
        var { name, value } = e.target
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        // console.log(this.state.newSite)
        // axios.post("http://localhost:8000/api/sites/", {
        //     siteName: "dacsx",
        //     siteLink: "fd",
        //     description: "fvcds"
        // })
        // .then(res => console.log(res))
        console.log(this.state)
        axios.post("http://localhost:8000/api/sites/", this.state)
        .then(res => console.log(res))
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
                            <input type='text' name='siteLink' onChange={this.handleChange} className='form-control bg-light' id='site-url' placeholder='https://example.com'/>
                            <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Add