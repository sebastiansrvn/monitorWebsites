import React from "react";

class Register extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
    }
    
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                        <h1>Register</h1>
                        <form onSubmit={this.handleSubmit} className='mt-3'>
                            <label htmlFor='email' className='form-label'><h5>Email</h5></label>
                            <input type='text' name='email' onChange={this.handleChange} className='form-control bg-light' id='email' placeholder='Enter your email.'/>
                            <label htmlFor='username' className='form-label mt-4'><h5>Username</h5></label>
                            <input type='text' name='username' onChange={this.handleChange} className='form-control bg-light' id='username' placeholder='Enter your email.'/>
                            <label htmlFor='password' className='form-label mt-4'><h5>Password</h5></label>
                            <input type='password' name='password' onChange={this.handleChange} className='form-control bg-light' id='password' placeholder='Enter your password'/>
                            <label htmlFor='confirmPassword' className='form-label mt-4'><h5>Confirm Your Password</h5></label>
                            <input type='password' name='confirmPassword' onChange={this.handleChange} className='form-control bg-light' id='confirmPassword' placeholder='Confirm your password'/>
                            <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;