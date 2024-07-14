import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/customers'>customers</NavLink>
                <NavLink to='/products'>Products</NavLink>
                <NavLink to='contact'>Contact</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/register'>Register</NavLink>
            </nav>
        </div>
    );
}

export default Navbar;
