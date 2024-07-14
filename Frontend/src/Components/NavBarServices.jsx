import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import '../CSS/NavBarServices.css';

const groceryImage = 'https://www.westend61.de/images/0000859375pw/woman-shopping-in-grocery-store-aisle-CAIF15595.jpg';
const fashionImage = 'https://tse1.explicit.bing.net/th?id=OIP.hF7QTj2zZqAf4Mu0SpB6MgHaE_&pid=Api&P=0&h=180';
// const electronicsImage = 'https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-Picture.png'; 
// const electronicsImage = 'https://tse2.mm.bing.net/th?id=OIP.J7AJsIz_9qv2i_P_d6-0hQHaDt&pid=Api&P=0&h=180';
const electronicsImage = 'https://tse1.mm.bing.net/th?id=OIP.dwH0dSuCHy10aWAtaL_9LwHaEK&pid=Api&P=0&h=180';
const booksImage = 'https://tse4.mm.bing.net/th?id=OIP.MMmlzztUmGro_ij6RBYMDgHaE7&pid=Api&P=0&h=180';
const travelImage = 'https://www.pixelstalk.net/wp-content/uploads/images6/Travel-Wallpaper-Free-Download.jpg';

const NavBarServices = () => {
    const { booksProducts, fashionProducts, electronicsProducts } = useUserContext();
    const [groceriesSize, setGroceriesSize] = useState(0);
    const [booksSize, setBooksSize] = useState(0);
    const [fashionSize, setFashionsSize] = useState(0);
    const [electronicsSize, setElectronicsSize] = useState(0);
    const [travelSize, setTravelSize] = useState(0);

    useEffect(() => {
        if (booksProducts && booksProducts.length > 0) {
            setBooksSize(booksProducts.length);
        }
        if (fashionProducts && fashionProducts.length > 0) {
            setFashionsSize(fashionProducts.length);
        }
        if (electronicsProducts && electronicsProducts.length > 0) {
            setElectronicsSize(electronicsProducts.length);
        }
    }, [booksProducts, fashionProducts, electronicsProducts])
    return (
        <div >
            <nav className='d-flex justify-content-around'>
                <NavLink to='/grocery' className='d-flex flex-column' id='service'>
                    <img src={groceryImage} alt='grocery img' id='my-image' style={{ borderRadius: '100%' }} />
                    <span>Grocery</span>
                    <span id='size'>{groceriesSize}</span>
                </NavLink>
                <NavLink to='/fashion' className='d-flex flex-column' id='service'>
                    <img src={fashionImage} alt='fashion img' id='my-image' style={{ borderRadius: '100%' }} />
                    <span>Fashion</span>
                    <span id='size'>{fashionSize}</span>
                </NavLink>
                <NavLink to='/electronics' className='d-flex flex-column' id='service'>
                    <img src={electronicsImage} alt='electronics img' id='my-image' style={{ borderRadius: '100%' }} />
                    <span>Electronics</span>
                    <span id='size'>{electronicsSize}</span>
                </NavLink>
                <NavLink to='/books' className='d-flex flex-column' id='service'>
                    <img src={booksImage} alt='books img' id='my-image' style={{ borderRadius: '100%' }} />
                    <span>Books</span>
                    <span id='size'>{booksSize}</span>
                </NavLink>
                <NavLink to='/travel' className='d-flex flex-column' id='service'>
                    <img src={travelImage} alt='travel img' id='my-image' style={{ borderRadius: '100%' }} />
                    <span>Travel</span>
                    <span id='size'>{travelSize}</span>
                </NavLink>
            </nav>
        </div>
    );
}

export default NavBarServices;
