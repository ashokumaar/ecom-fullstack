import React from 'react';
import { toast } from 'react-toastify';

const Settings = () => {
    const notify = () => {
        toast.success("hello Success", {
            autoClose: 2000
        });
    }

    return (
        <div>
            {/* <button className='btn btn-success' onClick={notify}>Click to see the toast</button> */}
            <button onClick={notify} >Hello</button>
            {/* <ToastContainer/> */}
        </div>
    );
}

export default Settings;
