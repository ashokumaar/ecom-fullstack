import React, { useState } from 'react';
import { createCustomer, getAllCustomers } from '../APIs/CustomerApi';

const Customer = () => {

    const initialCustomer = {
        id: '',
        firstName: '',
        lastName: '',
        image: '',
        company: '',
        phone: '',
        email: '',
        password: '',
        address: ''
    }
    const [customer, setCustomer] = useState({});
    const [formStatus, setFormStatus] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault()
        // createCustomer(customer)
        console.log(customer)
        setFormStatus(false)
    }

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
        console.log(customer);
    };

    const fetchAllCustomers = async () => {
        const customerList = await getAllCustomers();
        console.log(customerList.data);
    }

    return (
        <div className='container'>

            <button onClick={fetchAllCustomers}>Get all customers</button> <br />
            {
                formStatus ? <form>
                    <div className='row'>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Firstname : </label>
                            <input type='text' className='form-control' name='firstName' id='firstName' onChange={e => handleInputChange(e)} placeholder='enter your first name' />
                        </div>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Lastname :</label>
                            <input type='text' className='form-control' name='lastName' id='lastName' onChange={e => handleInputChange(e)} placeholder='enter your last name' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Company name :</label>
                            <input type='text' className='form-control' name='company' id='company' onChange={e => handleInputChange(e)} placeholder='enter company name' 
                            required/>
                        </div>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Phone number :</label>
                            <input type='number' className='form-control' name='phone' id='phone' onChange={e => handleInputChange(e)} placeholder='enter phone number' 
                            required />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Email id :</label>
                            <input type='email' className='form-control' name='email' id='email' onChange={e => handleInputChange(e)} placeholder='enter email id' 
                            required />
                        </div>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Password :</label>
                            <input type='password' className='form-control' name='password' id='password' onChange={e => handleInputChange(e)} placeholder='enter password'
                             required />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-md-6 mb-4'>
                            <label>Confirm Password :</label>
                            <input type='password' className='form-control' name='password'  onChange={e => handleInputChange(e)} placeholder='confirm password' 
                            required />
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={e => handleSubmit(e)}> Submit </button>
                </form>
                    :
                    <button className='btn btn-primary' onClick={() => setFormStatus(true)}>Add Customer</button>

            }
        </div>
    );
}

export default Customer;
