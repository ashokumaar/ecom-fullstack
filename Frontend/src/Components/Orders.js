import React from 'react';
import '../CSS/Products.css';

const Orders = () => {
    const card = {
        image: 'https://tse1.mm.bing.net/th?id=OIP.q13jBp5Xn38KKUeaQurwWQHaHn&pid=Api&P=0&h=180',
        title: 'IQOO Neo 6 (8+128GB)',
        originalPrice: 29000,
        discountedPrice: 26000,
        discountPercentage: 12
    }

    const cards = [1, 2, 3, 4, 5, 6, 7]

    // const [columns, setColumns] = useState(window.innerWidth >= 768 ? 3 : 2);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setColumns(window.innerWidth >= 768 ? 3 : 2);
    //     };
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize); // Cleanup
    // }, []);

    const renderCard = (eachCard) => (
        <div className='col-md-3 col-sm-3'>
            <div className="card" key={card.id}>
                <div className="d-flex justify-content-center">
                    <img id='image' src={card.image} alt={card.title} />
                </div>
                <div className="card-body">
                    <p className="card-title">{card.title}</p>
                    <p className="card-text">
                        <span id='disc-price'>{`₹${card.discountedPrice}`} </span>
                        <span className="text-decoration-line-through">{`₹${card.originalPrice}`}</span>
                        <span className='text-success'> ({card.discountPercentage}% off)</span>
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container">
            <div className='row'>
                {cards.map(renderCard)}
            </div>
        </div>
    )
}
export default Orders;
