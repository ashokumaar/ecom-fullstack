import React, { useEffect, useState } from 'react';
// import { UserContext } from '../SpringSecurityComponents/UserContext';
import NavBarServices from './NavBarServices';
import HomePageCarousel from './HomePageCarousel';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import RMC2 from './RMC2';

const img1 = 'https://m.media-amazon.com/images/G/31/img24/Fashion/AF/HTop/Hero/13thMay/Top_Herotator_PC._CB556939346_.png';
const img2 = 'https://m.media-amazon.com/images/G/31/img24/Fashion/AF/SS24/Flip/TopHero/PC/cml-pc._CB580671423_.jpg';
const img3 = 'https://m.media-amazon.com/images/G/31/img23/WA/2024/feb/SS/v3/ss-hero._CB557226212_.jpg';

const Home = () => {
    const { booksProducts, electronicsProducts, fashionProducts } = useUserContext();
    const [booksCards, setBooksCards] = useState([]);
    const [electronicsCards, setelectronicsCards] = useState([]);
    const [fashionCards, setfashionCards] = useState([]);

    useEffect(() => {
        if (booksProducts) {
            const randomBooks = [];
            for (let i = 0; i < 15; i++) {
                let randomIndex = Math.floor(Math.random() * booksProducts.length);
                let book = booksProducts[randomIndex];
                randomBooks.push(book);
            }
            setBooksCards(randomBooks);
        }
        if (electronicsProducts) {// these are having just 8 products don't need random values
            setelectronicsCards(electronicsProducts);
        }
        if (fashionProducts) {
            const randomFashionProducts = [];
            for (let i = 0; i < 15; i++) {
                let randomIndex = Math.floor(Math.random() * fashionProducts.length);
                let fashionProduct = fashionProducts[randomIndex];
                randomFashionProducts.push(fashionProduct);
            }
            setfashionCards(randomFashionProducts);
        }
    }, [booksProducts, electronicsProducts, fashionProducts])
    // const token = useContext(UserContext);

    return (
        <div className='mb-2'>
            <NavBarServices />
            <HomePageCarousel img1={img1} img2={img2} img3={img3} />
            <RMC2 value={fashionCards} heading='Fashion products' link='/fashion'/>
            <RMC2 value={booksCards} heading='Books' link='/books'/>
            <RMC2 style={{margin:'50px'}} value={electronicsCards} heading='Electronics products' link='/electronics'/>
        </div>
    );
}

export default Home;
