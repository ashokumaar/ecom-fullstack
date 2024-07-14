import React, { useState, useEffect } from 'react';
import { addAddress, getUserById } from '../APIs/AuthServiceAPIs'
import { toast } from 'react-toastify';
import '../CSS/LoginForm.css'

const AddressForm = ({ addressObj, handleAddressAdditions }) => {
    const [address, setAddress] = useState({
        id: 0,
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
    });

    useEffect(() => {
        if (addressObj) {
            setAddress({
                id: addressObj.id,
                street: addressObj.street,
                area: addressObj.area,
                city: addressObj.city,
                state: addressObj.state,
                pincode: addressObj.pincode
            })
        }
    }, [addressObj])

    const getUserDetails = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('UserId');
        try {
            if (userId && jwtToken) {
                const response = await getUserById(userId, jwtToken);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data);
                    sessionStorage.removeItem('User Details');
                    sessionStorage.setItem('User Details', JSON.stringify(data));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted Address:', address);
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('UserId');
            // const response = await addAddress({ ...address, 'user': { id: userId } }, jwtToken);
            const response = await addAddress({ ...address }, userId, jwtToken);
            if (response.status === 201) {
                const data = await response.data;
                console.log('Address created successfully', data);
                toast.success('Address created', { autoClose: 1500 });
                sessionStorage.setItem('address added', true);
                getUserDetails();
                handleAddressAdditions();
            } else if (response.status === 200) {
                const data = await response.data;
                console.log('Address updated successfully', data);
                toast.success('Address updated', { autoClose: 1500 });
                sessionStorage.setItem('address updated', true);
                getUserDetails();
                handleAddressAdditions();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Address Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row" id='address-form-div'>
                    <p className="col-sm-2 col-form-label col-form-label-sm" id='address-form-div'>Street address</p>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="street" name="street" value={address.street} onChange={handleChange} placeholder="home, apartment, nearby, besides" required />
                    </div>
                </div>
                <div className="form-group row" id='address-form-div'>
                    <p className="col-sm-2 col-form-label col-form-label-sm" id='address-form-div'>Area</p>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="area" name="area" value={address.area} onChange={handleChange} placeholder="area" required />
                    </div>
                </div>
                <div className="form-group row" id='address-form-div'>
                    <p className="col-sm-2 col-form-label col-form-label-sm" id='address-form-div'>City</p>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="city" name="city" value={address.city} onChange={handleChange} placeholder="city" required />
                    </div>
                </div>
                <div className="form-group row" id='address-form-div'>
                    <p className="col-sm-2 col-form-label col-form-label-sm" id='address-form-div'>State</p>
                    <div className="col-sm-10">
                        <input type="text" className="form-control form-control-sm" id="state" name="state" value={address.state} onChange={handleChange} placeholder="state" required />
                    </div>
                </div>
                <div className="form-group row" id='address-form-div'>
                    <p className="col-sm-2 col-form-label col-form-label-sm" id='address-form-div'>Pincode</p>
                    <div className="col-sm-10">
                        <input type="number" className="form-control form-control-sm" id="pincode" name="pincode" value={address.pincode} onChange={handleChange} placeholder="pincode" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddressForm;
