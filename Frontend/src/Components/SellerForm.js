import React, { useState } from 'react';
import { addNewUser, generateToken } from './ControllerAPIs';
import '../CSS/LoginForm.css';

const SellerForm = () => {
    const [userInfo, setUserInfo] = useState({ name: '', password: '', email: '', roles: 'ROLE_USER' })
    const [authRequest, setAuthRequest] = useState({ username: '', password: '' })
    const [token, setToken] = useState('')


    const generateToken2 = async (payload) => {
        let response = await generateToken(payload);
        let data = await response.data;
        console.log("GeneratedToken :: ", data);
        if (response.status === 200) {
            setToken(response.data)
            localStorage.setItem('token', data)
        }
    }
    const addUser = async (e) => {
        e.preventDefault()
        console.log("payload :: ", userInfo);
        let response = await addNewUser(userInfo)
        let data = await response.data;
        console.log(data);
        if (response.status === 200) {
            console.log("Success✔️")
            setAuthRequest({ ...authRequest, username: userInfo.name, password: userInfo.password })
            console.log("AuthRequest :: ", authRequest)
            generateToken2(authRequest);
        }
    }
    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form class="form-signin" onSubmit={(e) => addUser(e)}>
                <h2 class="form-signin-heading">Please sign in</h2>
                <input type="text" id="name" name="name" class="form-control" value={userInfo.name} onChange={e => handleInputChange(e)} placeholder="Username" required />
                <input type="email" id="email" name="email" class="form-control" value={userInfo.email} onChange={e => handleInputChange(e)} placeholder="Email" required />
                <input type="password" id="password" name="password" class="form-control" value={userInfo.password} onChange={e => handleInputChange(e)} placeholder="Password" required />
                <button class="btn btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );
}

export default SellerForm;
