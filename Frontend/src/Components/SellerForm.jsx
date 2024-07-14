import React, { useEffect, useState } from 'react';
import { checkUsernameExist, registerSeller } from '../APIs/AuthServiceAPIs';
import '../CSS/LoginForm.css';
import { toast } from 'react-toastify';

const SellerForm = () => {
    const [userInfo, setUserInfo] = useState({ username: '', password: '', email: '', phone: '' });
    const [address, setAddress] = useState({
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [userFoundError, setUserFoundError] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            toast.error('please login to fill the form', { autoClose: 3000 })
        } else {
            setToken(jwtToken);
        }
    }, [])

    const addUser = async (e) => {
        e.preventDefault()
        let userfound = await checkUsernameExist(userInfo.username);
        if (userfound.data) {
            setUserFoundError(true);
            return;
        } else {
            setUserFoundError(false);
            const sellerApplication = { ...userInfo, "addressList": [{ ...address }] };
            console.log("payload :: ", sellerApplication);
            let response = registerSeller(sellerApplication, token);
            let promise = await toast.promise(response, {
                pending: "registration pending",
                success: "Application submitted successfully",
                error: "something went wrong!",
            });
            console.log(promise);
            if (promise.status === 200) {
                toast.success('Our team will get back to you and inspect soon. If they satisfied then you\'ll get the seller authorities.');
                console.log("Application submitted success✔")
            }
        }
    }
    const handleUserInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    const handleAddressInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    return (
        <>
            {token && <div>
                <form className="form-signin" onSubmit={(e) => addUser(e)}>
                    <h2 className="form-signin-heading">Fill the form</h2>
                    <input type="text" id="username" name="username" className="form-control" value={userInfo.username} onChange={e => handleUserInputChange(e)} placeholder="Username (should be unique)" required />
                    {
                        userFoundError &&
                        <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>username already taken</span>
                    }
                    <input type="email" id="email" name="email" className="form-control" value={userInfo.email} onChange={e => handleUserInputChange(e)} placeholder="Email" required />
                    <input type="password" id="password" name="password" className="form-control" value={userInfo.password} onChange={e => handleUserInputChange(e)} placeholder="Password" required />
                    <input type="text" id="phone" name="phone" className="form-control" value={userInfo.phone} onChange={e => handleUserInputChange(e)} placeholder="Phone" required />
                    <input type="text" className="form-control form-control-sm" id="street" name="street" value={address.street} onChange={handleAddressInputChange} placeholder="home, apartment, nearby, besides" required />
                    <input type="text" className="form-control form-control-sm" id="area" name="area" value={address.area} onChange={handleAddressInputChange} placeholder="area" required />
                    <input type="text" className="form-control form-control-sm" id="city" name="city" value={address.city} onChange={handleAddressInputChange} placeholder="city" required />
                    <input type="text" className="form-control form-control-sm" id="state" name="state" value={address.state} onChange={handleAddressInputChange} placeholder="state" required />
                    <input type="number" className="form-control form-control-sm" id="pincode" name="pincode" value={address.pincode} onChange={handleAddressInputChange} placeholder="pincode" required />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>}
        </>
    );
}

export default SellerForm;
