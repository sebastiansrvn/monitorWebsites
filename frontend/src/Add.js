import React from 'react';

class Add extends React.Component {
    render() {
        return <>
            <div className="container">
                <div className='row'>
                    <div className='col-md-12 border bg-white rounded p-5 mt-5'>
                        <form>
                            <label htmlFor='site-name' className='form-label'><h5>Name</h5></label>
                            <input type='text' className='form-control bg-light' id='site-name' placeholder='Enter your site name.'/>
                            <label htmlFor='site-url' className='form-label mt-4'><h5>Site URL</h5></label>
                            <input type='text' className='form-control bg-light' id='site-url' placeholder='https://example.com'/>
                            <button style={{ backgroundColor: '#0d1821' }} className='btn text-white mt-3'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Add