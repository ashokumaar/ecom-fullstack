import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, generateToken, checkUsernameExist, userProfile } from '../APIs/AuthServiceAPIs';
import { useUserContext } from './UserContext';
import '../CSS/LoginForm.css'

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({ username: '', password: '', email: '', phone: '' })
    const [userFoundError, setUserFoundError] = useState(false);
    const { handleLogin, handleSetUser } = useUserContext();
    const navigate = useNavigate();

    const generateToken2 = async (payload) => {
        let response = await generateToken(payload);
        let token = await response.data;
        console.log("GeneratedToken :: ", token);
        if (response.status === 200) {
            handleLogin(token); // Update context with the received JWT token
            toast.success('login success')
            sessionStorage.removeItem('AuthUsername');
            sessionStorage.removeItem('AuthPassword');
            sessionStorage.removeItem('SessionExpired');
            navigate('/');
            let response = await userProfile(token);
            let data = await response.data;
            handleSetUser(data);
        } else {
            console.log('login failed ', response.statusText);
        }
    }
    const addUser = async (e) => {
        e.preventDefault()
        sessionStorage.setItem('AuthUsername', userInfo.username);
        sessionStorage.setItem('AuthPassword', userInfo.password);
        let userfound = await checkUsernameExist(userInfo.username);
        if (userfound.data) {
            setUserFoundError(true);
            return;
        } else {
            setUserFoundError(false);
            let response = registerUser(userInfo)
            let promise = await toast.promise(response, {
                pending: "registration pending",
                success: "register successfull",
                error: "something went wrong!",
            });
            if (promise.status === 200) {
                console.log("Register success✔")
                await new Promise(resolve => setTimeout(resolve, 3000));
                generateToken2({ username: sessionStorage.getItem('AuthUsername'), password: sessionStorage.getItem('AuthPassword') });
            }
        }
    }

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form className="form-signin" onSubmit={(e) => addUser(e)}>
                <h2 className="form-signin-heading">Create account</h2>
                <input type="text" id="username" name="username" className="form-control" value={userInfo.username} onChange={e => handleInputChange(e)} placeholder="Username (should be unique)" required />
                {
                    userFoundError &&
                    <span style={{ color: 'red', fontSize: '0.8rem', marginLeft: '1.5rem' }}>username already taken</span>
                }
                <input type="email" id="email" name="email" className="form-control" value={userInfo.email} onChange={e => handleInputChange(e)} placeholder="Email" required />
                <input type="password" id="password" name="password" className="form-control" value={userInfo.password} onChange={e => handleInputChange(e)} placeholder="Password" required />
                <input type="text" id="phone" name="phone" className="form-control" value={userInfo.phone} onChange={e => handleInputChange(e)} placeholder="Phone" required />
                <button className="btn btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );
}

export default SignUp;
