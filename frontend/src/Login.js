import React from  'react';

class Login extends React.Component {

    handleChange = () => {
        
    }

    handleSubmit = () => {

    }
    
    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit} className='mt-3'>
                            <label htmlFor='email' className='form-label'><h5>Email</h5></label>
                            <input type='text' name='email' onChange={this.handleChange} className='form-control bg-light' id='email' placeholder='Enter your email.'/>
                            <label htmlFor='password' className='form-label mt-4'><h5>Password</h5></label>
                            <input type='password' name='password' onChange={this.handleChange} className='form-control bg-light' id='password' placeholder='Enter your password'/>
                            <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;