import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from './UserContext'

const Logout = () => {
    const navigate = useNavigate();
    const { handleLogout } = useUserContext();

    useEffect(() => {
        const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
        if (!hasLoggedOut) {
            handleLogout();
            toast.success("Logout Success", {
                autoClose: 3000
            });
            setTimeout(() => navigate('/auth/login'), 1500);
            sessionStorage.setItem('hasLoggedOut', 'true');
        }
    }, [handleLogout, navigate]);

    return (
        <div className='container'>
            <h4>Successfully logged out</h4>
        </div>
    );
}

export default Logout;
