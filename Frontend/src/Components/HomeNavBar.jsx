import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isExpired } from 'react-jwt'
import { List, House, Search, Cart4 } from 'react-bootstrap-icons'
import { Offcanvas } from 'react-bootstrap';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import '../CSS/HomeNavBar.css'

const HomeNavBar = () => {
    const { jwtToken, totalItems, isAdmin } = useUserContext();
    const [showSidebar, setShowSidebar] = useState(false); // State for offcanvas visibility
    const [admin, setAdmin] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isInputActive, setIsInputActive] = useState(false); // State to track input focus
    const navigate = useNavigate();

    useEffect(() => {
        const cachedAdmin = localStorage.getItem('isAdmin');
        if (cachedAdmin || isAdmin) {
            setAdmin(true);
        }

    }, [isAdmin])

    const names = ['mens shirts', 'mens pants', 'mens kurthas', 'mens jeans', 'shoes', 'womens lehenga', 'womens dress', 'womens jeans', 'womens tops', 'mobiles', 'books', 'software engineering', 'java', 'internet', 'microsoft .net', 'web development', 'programming', 'python', 'object-oriented programming']; // Sample names list

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value) {
            const filteredSuggestions = names.filter(name => name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        console.log(suggestion);
        navigate(`/search/${suggestion}`);
        setSuggestions([]);
    };


    const isMyTokenExpired = isExpired(jwtToken)

    const handleCloseSidebar = () => setShowSidebar(false);
    const handleOpenSidebar = () => setShowSidebar(true);
    return (
        (<div className='sticky-top'>
            <nav className="navbar">
                <button type='button' className='btn'><List id='sidebar-menu' onClick={handleOpenSidebar} /></button>
                <NavLink to='/'><House id='home-icon' /></NavLink>
                <div className="input-group">
                    <div className="form-outline">
                        <button type="button" className="btn">
                            <Search id='search-icon'
                                onClick={() => {
                                    setIsInputActive(false);
                                    if (searchTerm.length > 0) {
                                        navigate(`/search/${searchTerm}`)
                                    }
                                }} />
                        </button>
                        <input
                            type="search"
                            value={searchTerm}
                            className="form-control"
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (searchTerm.length > 0 && event.key === 'Enter') {
                                    setIsInputActive(false);
                                    navigate(`/search/${searchTerm}`)
                                }
                            }}
                            onFocus={() => setIsInputActive(true)} // Set focus state to true on focus
                            onBlur={() => setIsInputActive(false)} // Set focus state to false on blur
                            placeholder='search...'
                        />
                        {
                            isInputActive && suggestions.length > 0 && (
                                <div className="suggestions-list" style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '2px',
                                    right: '2px',
                                    border: '1px solid #ccc',
                                    borderRadius: '1%',
                                    backgroundColor: '#EEEEEE',
                                    zIndex: 1000
                                }}>
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="suggestion-item"
                                            style={{
                                                padding: '8px',
                                                cursor: 'pointer'
                                            }}
                                            onMouseDown={(e) => e.preventDefault()} // Prevent default to keep input focused
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            onTouchEnd={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                    Your Orders
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
                            {
                                admin &&
                                <li className='list-group-item'>
                                    <NavLink to='/admin' onClick={handleCloseSidebar}>
                                        Admin page (manage order statuses)
                                    </NavLink>
                                </li>
                            }
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </nav>
        </div>)
    );
}

export default HomeNavBar;
