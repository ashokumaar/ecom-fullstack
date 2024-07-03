import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { generateToken, userProfile } from '../APIs/AuthServiceAPIs';
import { useUserContext } from './UserContext';
import '../CSS/LoginForm.css'

const LoginForm = () => {
    const [authRequest, setAuthRequest] = useState({ username: '', password: '' })
    const { handleLogin, handleSetUser } = useUserContext();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            // Generate token
            let response = await generateToken(authRequest);
            if (response.status === 200) {
                let token = await response.data;
                console.log("Generate Token Response Data ::: ", token);
                console.log("Status code ::: 200");

                // Update context with the received JWT token
                handleLogin(token);
                toast.success("Login Success", { autoClose: 2000 });
                sessionStorage.removeItem('SessionExpired');

                // Fetch user profile
                response = await userProfile(token);
                if (response.status === 200) {
                    let data = await response.data;
                    handleSetUser(data);
                    // Navigate after successfully setting the user
                    navigate('/');
                } else {
                    console.log('Failed to fetch user profile ', response.statusText);
                }
            } else {
                console.log('Login failed ', response.statusText);
            }
        } catch (error) {
            console.log('Something went wrong', error);
            toast.error("Something went wrong, check username and password are correct", { autoClose: 5000 });
        }
    }

    const onChangeInputHandle = (e) => {
        setAuthRequest({ ...authRequest, [e.target.name]: e.target.value })
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container">
            <form className="form-signin" onSubmit={e => submitHandle(e)}>
                <h2 className="form-signin-heading">Please sign in</h2>
                <input type="text" id="username" name="username" className="form-control" value={authRequest.username} onChange={e => onChangeInputHandle(e)} placeholder="Username" required />
                <input type={showPassword ? "text" : "password"} id="password" name="password" className="form-control" value={authRequest.password} onChange={e => onChangeInputHandle(e)} placeholder="Password" required />
                <div className="checkbox">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={toggleShowPassword}
                        /> Show Password
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
            <div>
                Don't you have account, please 
                <NavLink to='/auth/register' style={{ textDecoration: 'none', fontWeight: 'bold' }}> Sign-up </NavLink>
                 now.
            </div>
        </div>
    );
}

export default LoginForm;
