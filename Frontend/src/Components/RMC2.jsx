import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { Card } from "react-bootstrap";
import { CartPlus } from 'react-bootstrap-icons';
import 'react-multi-carousel/lib/styles.css';
import { Container } from 'react-bootstrap';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import '../CSS/Products.css';

const RMC2 = (props) => {
    const cards = props.value;
    const heading = props.heading
    const link = props.link;
    const { addToCart } = useUserContext();
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const [cardHeight, setCardHeight] = useState(0); // State to store the height of cards

    // Effect to set the height of the cards
    useEffect(() => {
        const updateCardHeight = () => {
            const cardElements = document.querySelectorAll('.card');
            if (cardElements.length > 0) {
                const maxHeight = Math.max(...Array.from(cardElements).map(card => card.offsetHeight));
                setCardHeight(maxHeight);
            }
        };
        updateCardHeight();
        window.addEventListener('resize', updateCardHeight);

        return () => {
            window.removeEventListener('resize', updateCardHeight);
        };
    }, [cards]);

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
    const handleAddToCart = (product) => {
        addToCart(product);
    };
    return (
        <Container className='my-3'>
            <h4 style={{ textAlign: "start", paddingLeft: '10px' }}>{heading}</h4>
            <Carousel ref={carouselRef} responsive={responsive} beforeChange={(nextSlide) => setCurrentSlide(nextSlide)}>
                {cards.length > 0 && cards[0] !== undefined && cards.map((eachCard, index) => (
                    <div key={index} className="card-wrapper">
                        <Card className="mb-1" id='card' style={{ height: index === cards.length - 1 ? `${cardHeight}px` : 'auto' }}>
                            {
                                (index === cards.length - 1) ?
                                    <>
                                        <div id="see-more-card">
                                            <NavLink to={link}>See more</NavLink>
                                        </div>
                                    </> :
                                    <>
                                        <Card.Img style={{ objectFit: 'contain' }} variant="top" src={eachCard.imageUrl} alt={eachCard.title} />
                                        <Card.Body>
                                            <Card.Title id='product-card-title'>{eachCard.title}</Card.Title>
                                            <Card.Text>
                                                {/* <p>id : {eachCard.id}</p> */}
                                                <span className='d-md-block' id="disc-price">{`₹${new Intl.NumberFormat('en-IN').format(eachCard.discountedPrice)}`}</span>
                                                <span className="text-decoration-line-through">{`₹${new Intl.NumberFormat('en-IN').format(eachCard.price)}`}</span>
                                                <span className="text-success"> {eachCard.discountPercent}% off</span>
                                            </Card.Text>
                                            <button className="btn btn-light w-100" onClick={() => handleAddToCart(eachCard)}><CartPlus color="#81D4FA" size={20} /></button>
                                        </Card.Body>
                                    </>
                            }
                        </Card>
                    </div>
                ))}
            </Carousel>
            {
                window.innerWidth < 767 && (
                    <div className='d-flex justify-content-between pb-4' >
                        {currentSlide === 0 && (
                            <div></div>
                        )}
                        {currentSlide > 0 && (
                            <div className='text-start'>
                                <span className='p-3' onClick={handlePrevSlide} onTouchStart={handlePrevSlide} style={{ color: '#004d00' }}>{`<- swipe`}</span>
                            </div>
                        )}
                        {currentSlide < cards.length - 2 && (
                            <div className='text-end'>
                                <span className='p-3' onClick={handleNextSlide} onTouchStart={handleNextSlide} style={{ color: '#004d00' }}>{`swipe ->`}</span>
                            </div>
                        )}
                    </div>
                )
            }
        </Container>
    );
};

export default RMC2;
