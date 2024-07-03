import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isExpired } from 'react-jwt'
import { useUserContext } from './UserContext';
import { List, House, Search, Cart4 } from 'react-bootstrap-icons'
import { Offcanvas } from 'react-bootstrap';
import '../CSS/NavBar2.css'

const NavBar2 = () => {
    const [showSidebar, setShowSidebar] = useState(false); // State for offcanvas visibility
    const { jwtToken, totalItems } = useUserContext();

    const isMyTokenExpired = isExpired(jwtToken)

    const handleCloseSidebar = () => setShowSidebar(false);
    const handleOpenSidebar = () => setShowSidebar(true);
    return (
        <div className='sticky-top'>
            <nav className="navbar">
                <button type='button' className='btn'><List id='sidebar-menu' onClick={handleOpenSidebar} /></button>
                <NavLink to='/'><House id='home-icon' /></NavLink>
                <div className="input-group">
                    <div className="form-outline">
                        <button type="button" className="btn">
                            <Search id='search-icon' />
                        </button>
                        <input type="search" className="form-control" placeholder='search...' />
                    </div>
                </div>
                {isMyTokenExpired ?
                    <NavLink to='/auth/login'>Login</NavLink>
                    :
                    <NavLink to='/auth/logout'>Logout</NavLink>}

                <NavLink to='/cart' className='cart-icon-container'>
                    <Cart4 id='cart-icon' />
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
                </NavLink>
                {/* Offcanvas component for sidebar */}
                <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement='start' id='offcanvas' >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul className="list-group flush">
                            <li className="list-group-item">
                                <NavLink to="/orders" onClick={handleCloseSidebar}>
                                    Orders
                                </NavLink>
                            </li>
                            <li className="list-group-item">
                                <NavLink to="/history" onClick={handleCloseSidebar}>
                                    History
                                </NavLink>
                            </li>
                            <li className="list-group-item">
                                <NavLink to="/settings" onClick={handleCloseSidebar}>
                                    Settings
                                </NavLink>
                            </li>
                            <li className='list-group-item'>
                                <NavLink to='/seller' onClick={handleCloseSidebar}>
                                    Become a seller!
                                </NavLink>
                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </nav>
        </div>
    );
}

export default NavBar2;
