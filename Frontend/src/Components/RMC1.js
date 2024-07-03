import React, { useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap';
import '../CSS/Products.css';

const RMC1 = (props) => {
  const card = props.value;
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  // const card = {
  //   image: 'https://tse1.mm.bing.net/th?id=OIP.q13jBp5Xn38KKUeaQurwWQHaHn&pid=Api&P=0&h=180',
  //   title: 'IQOO Neo 6 (8+128GB)',
  //   originalPrice: 29000,
  //   discountedPrice: 26000,
  //   discountPercentage: 12
  // }
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      showArrows: false // Hide arrows on mobile
    }
  };
  const handleNextSlide = () => {
    carouselRef.current.next();
  };

  const handlePrevSlide = () => {
    carouselRef.current.previous();
  };
  return (
    <Container className='mt-2 mb-2'>
      <h4 style={{ textAlign: "start", paddingLeft: '10px' }}>Electronics</h4>
      <Carousel ref={carouselRef} responsive={responsive} beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}>
        {cards.map((eachCard, index) => (
          <div key={index} className="card-wrapper">
            <div className="card" id='card'>
              <div className="d-flex justify-content-center">
                <img id="image" src={card.image} alt={card.title} />
              </div>
              <div className="card-body">
                <p className="card-title">{card.title},{eachCard}</p>
                <p className="card-text">
                  <span id="disc-price">{`₹${card.discountedPrice}`}</span>
                  <span className="text-decoration-line-through">{`₹${card.originalPrice}`}</span>
                  <span className="text-success"> ({card.discountPercentage}% off)</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {
        window.innerWidth <= 768 && (
          <div className='d-flex justify-content-between' >
            {currentSlide === 0 && (
              <div></div>
            )}
            {currentSlide > 0 && (
              <div className='text-start'>
                <span className='p-3' onTouchStart={handlePrevSlide} style={{color:'#004d00'}}>{`<- swipe`}</span>
              </div>
            )}
            {currentSlide < cards.length - 2 && (
              <div className='text-end'>
                <span className='p-3' onTouchStart={handleNextSlide} style={{color:'#004d00'}}>{`swipe ->`}</span>
              </div>
            )}
          </div>
        )
      }
    </Container>
  );
};

export default RMC1;
