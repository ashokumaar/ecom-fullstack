import React from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/NavBarServices.css'

const groceryImage = 'https://www.westend61.de/images/0000859375pw/woman-shopping-in-grocery-store-aisle-CAIF15595.jpg';
const fashionImage = 'https://tse1.explicit.bing.net/th?id=OIP.hF7QTj2zZqAf4Mu0SpB6MgHaE_&pid=Api&P=0&h=180';
const electronicsImage = 'https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-Picture.png';
const booksImage = 'https://tse4.mm.bing.net/th?id=OIP.MMmlzztUmGro_ij6RBYMDgHaE7&pid=Api&P=0&h=180';
const travelImage = 'https://www.pixelstalk.net/wp-content/uploads/images6/Travel-Wallpaper-Free-Download.jpg';


const NavBarServices = () => {
    return (
        <div >
            <nav className='d-flex justify-content-around'>
                <NavLink to='/grocery' className='d-flex flex-column'>
                    <img src={groceryImage} alt='grocery img' id='my-image' style={{borderRadius:'100%'}} />
                    <span>Grocery</span>
                </NavLink>
                <NavLink to='/fashion' className='d-flex flex-column'>
                    <img src={fashionImage} alt='fashion img' id='my-image' style={{borderRadius:'100%'}} />
                    <span>Fashion</span>
                </NavLink>
                <NavLink to='/electronics' className='d-flex flex-column'>
                    <img src={electronicsImage} alt='electronics img' id='my-image' style={{borderRadius:'100%', background:'orange'}} />
                    <span>Electronics</span>
                </NavLink>
                <NavLink to='/books' className='d-flex flex-column'>
                    <img src={booksImage} alt='books img' id='my-image' style={{borderRadius:'100%'}} />
                    <span>Books</span></NavLink>
                <NavLink to='/travel' className='d-flex flex-column'>
                    <img src={travelImage} alt='travel img' id='my-image' style={{borderRadius:'100%'}} />
                    <span>Travel</span>
                </NavLink>
            </nav>
        </div>
    );
}

export default NavBarServices;
