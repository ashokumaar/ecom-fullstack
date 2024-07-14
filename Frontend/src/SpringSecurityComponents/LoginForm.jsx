import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { generateToken, userProfile, isAdmin } from '../APIs/AuthServiceAPIs';
import { useUserContext } from './UserContext';
import '../CSS/LoginForm.css'

const LoginForm = (props) => {
    const [authRequest, setAuthRequest] = useState({ username: '', password: '' })
    const { handleLogin, handleSetUser, handleAdmin } = useUserContext();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            const response1 = await generateToken(authRequest);
            if (response1.status === 200) {
                toast.success("Login Success", { autoClose: 2000 });
                const token = await response1.data;
                handleLogin(token);
                sessionStorage.removeItem('SessionExpired');
                const response2 = await userProfile(token);
                if (response2.status === 200) {
                    let data = await response2.data;
                    handleSetUser(data);
                    try {
                        const response3 = await isAdmin(token);
                        if (response3.status === 200) {
                            handleAdmin();
                            navigate('/');
                        }
                    } catch (error) {
                        console.log('not an admin');
                        navigate('/');
                    }
                } else {
                    console.log('Failed to fetch user profile ', response2.statusText);
                }
            } else {
                console.log('Login failed ', response1.statusText);
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
                <h3 className="form-signin-heading">{props.value ? props.value : 'Please sign in'}</h3>
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
