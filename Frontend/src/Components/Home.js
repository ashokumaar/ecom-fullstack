import React from 'react';
// import { UserContext } from '../SpringSecurityComponents/UserContext';
import NavBarServices from '../SpringSecurityComponents/NavBarServices';
import RMC1 from './RMC1';
import HomePageCarousel from './HomePageCarousel';

const img1 = 'https://m.media-amazon.com/images/G/31/img24/Fashion/AF/HTop/Hero/13thMay/Top_Herotator_PC._CB556939346_.png';
const img2 = 'https://m.media-amazon.com/images/G/31/img24/Fashion/AF/SS24/Flip/TopHero/PC/cml-pc._CB580671423_.jpg';
const img3 = 'https://m.media-amazon.com/images/G/31/img23/WA/2024/feb/SS/v3/ss-hero._CB557226212_.jpg';

const Home = () => {

    const card = {
        image: 'https://tse1.mm.bing.net/th?id=OIP.q13jBp5Xn38KKUeaQurwWQHaHn&pid=Api&P=0&h=180',
        title: 'IQOO Neo 6 (8+128GB)',
        originalPrice: 29000,
        discountedPrice: 26000,
        discountPercentage: 12
    }

    // const token = useContext(UserContext);

    return (
        <div>
            <NavBarServices />
            <HomePageCarousel img1={img1} img2={img2} img3={img3}/>
            <RMC1 value={card}/> 
            <RMC1 value={card}/>
            {/* <RMC1 value={card}/> */}
        </div>
    );
}

export default Home;
