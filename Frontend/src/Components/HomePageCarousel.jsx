import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../CSS/Carousel.css'

const HomePageCarousel = ({ img1, img2, img3 }) => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    // className='d-block w-100 h-100'
                    className='d-block'
                    src={img1}
                    alt='first img'
                    text="First slide"
                />
                <Carousel.Caption className='d-none d-sm-block'>
                    {/* <h3>First slide label</h3> */}
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block'
                    src={img2}
                    alt='second img'
                    text="Second slide"
                />
                <Carousel.Caption className='d-none d-sm-block'>
                    {/* <h3>Second slide label</h3> */}
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block'
                    src={img3}
                    alt='third img'
                    text="Third slide"
                />
                <Carousel.Caption className='d-none d-sm-block'>
                    {/* <h3>Third slide label</h3> */}
                    {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomePageCarousel;
