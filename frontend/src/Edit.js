import React from 'react';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            siteName: props.siteName,
            siteLink: props.siteLink,
            description: props.description
        })
    }
    
    handleEdit = (e) => {
        e.preventDefault();
        this.props.handleEdit({ siteName: this.state.siteName, siteLink: this.state.siteLink, description: this.state.description });
    }

    handleChange = (e) => {
        var { name, value } = e.target
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12 border bg-white rounder p-5 mt-5'>
                    <form onSubmit={this.handleEdit}>
                        <div className="mb-3">
                            <label htmlFor="siteName" className="form-label"><h5>Site Name</h5></label>
                            <input onChange={this.handleChange} type="text" value={this.state.siteName} name="siteName" className="form-control bg-light" id="siteName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="siteLink" className="form-label"><h5>Site URL</h5></label>
                            <input onChange={this.handleChange} type="url" value={this.state.siteLink} name="siteLink" className="form-control bg-light" id="siteLink" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><h5>Description</h5></label>
                            <textarea onChange={this.handleChange} value={this.state.description} name="description" className="form-control bg-light" id="description" aria-describedby="emailHelp" />
                        </div>
                        <button type="submit" className="btn btn-warning">Edit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Edit;