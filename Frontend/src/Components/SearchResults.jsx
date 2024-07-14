import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Dropdown, Card, Button } from "react-bootstrap";
import { Filter, CartPlus } from 'react-bootstrap-icons';
import { useUserContext } from '../SpringSecurityComponents/UserContext';

const sortOptions = [
    // { name: 'Most Popular', value: 'most-popular' },
    // { name: 'Best Rating', value: 'best-rating' },
    // { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price-low-high' },
    { name: 'Price: High to Low', value: 'price-high-low' },
];

const SearchResults = () => {
    const { term } = useParams();
    const { products } = useUserContext();
    const [mainCategory, setMainCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [price, setPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    const [maxPice, setMaxPrice] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        handlePrice();
    }, [term])
    useEffect(() => {
        if (term && term.length > 0) {
            let searchTerms = term.toLowerCase().split(' ');
            // let searchTerm = term.toLowerCase().split(' '); //  split('/\s+/')
            setIsLoading(true);
            let tempProducts = products;
            // console.log(tempProducts);
            const categorizedProducts = tempProducts.filter(
                (product) => {
                    return searchTerms.some((eachterm) => {
                        eachterm = eachterm.toLocaleLowerCase();
                        if (eachterm === 'mens' || eachterm === 'boy' || eachterm === 'boys') {
                            eachterm = 'men'
                        } else if (eachterm === 'womens' || eachterm === 'girl' || eachterm === 'girls') {
                            eachterm = 'women'
                        } else if (eachterm === 'shirts'.toLowerCase()) {
                            eachterm = 'shirt';
                        } else if (eachterm === 'pants') {
                            eachterm = 'pant';
                        } else if (eachterm === 'tops') {
                            eachterm = 'top';
                        }
                        let topLevelCategory = null;
                        let secondLevelCategory = null;
                        let thirdLevelCategory = null;
                        let title = null;
                        let brand = null;
                        let color = null;
                        let category = null;
                        if (eachterm === 'men' || mainCategory === 'mens') {
                            //  && ((product.id >= 5000 && product.id <= 5199) || (product.id >= 5280 && product.id <= 5359))
                            if ((product.id >= 5000 && product.id <= 5119) || (product.id >= 5280 && product.id <= 5359)) {
                                if (searchTerms.length === 1) {
                                    return true;
                                } else if (eachterm !== 'men') {
                                    if (product.thirdLevelCategory) {
                                        thirdLevelCategory = product.thirdLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.secondLevelCategory && !thirdLevelCategory) {
                                        secondLevelCategory = product.secondLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.topLevelCategory && !secondLevelCategory) {
                                        topLevelCategory = product.topLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.title && !topLevelCategory) {
                                        title = product.title.toLowerCase().includes(eachterm)
                                    }
                                }
                            }
                        } else if (eachterm === 'women' || mainCategory === 'womens') {
                            //  && (product.id >= 5200 && product.id <= 5279)
                            if (product.id >= 5200 && product.id <= 5279) {
                                if (searchTerms.length === 1) {
                                    return true;
                                } else if (eachterm !== 'women') {
                                    if (product.thirdLevelCategory) {
                                        thirdLevelCategory = product.thirdLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.secondLevelCategory && !thirdLevelCategory) {
                                        secondLevelCategory = product.secondLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.topLevelCategory && !secondLevelCategory) {
                                        topLevelCategory = product.topLevelCategory.toLowerCase().includes(eachterm)
                                    }
                                    if (product.title && !topLevelCategory) {
                                        title = product.title.toLocaleLowerCase().includes(eachterm);
                                    }
                                }
                            }
                        } else {
                            if (product.thirdLevelCategory) {
                                thirdLevelCategory = product.thirdLevelCategory.toLowerCase().includes(eachterm)
                            }
                            if (product.secondLevelCategory && !thirdLevelCategory) {
                                secondLevelCategory = product.secondLevelCategory.toLowerCase().includes(eachterm)
                            }
                            if (product.topLevelCategory && !secondLevelCategory) {
                                if (eachterm === 'book' || eachterm === 'books') {
                                    topLevelCategory = product.topLevelCategory.toLowerCase().includes("genres")
                                } else {
                                    topLevelCategory = product.topLevelCategory.toLowerCase().includes(eachterm)
                                }
                            }
                            if (!topLevelCategory && !secondLevelCategory && !thirdLevelCategory) {
                                title = product.title.toLowerCase().includes(eachterm)
                            }
                            if (product.brand && !title) {
                                brand = product.brand.toLowerCase().includes(eachterm)
                            }
                            if (product.color && !brand) {
                                color = product.color.toLowerCase().includes(eachterm)
                            }
                            if (product.categories && !color) {
                                category = product.categories.some((eachCategory => eachCategory.toLowerCase().includes(eachterm)))
                            }
                        }
                        return topLevelCategory || secondLevelCategory || thirdLevelCategory || title || brand || color || category;
                    })
                }
            );

            // console.log(categorizedProducts);

            const underPriceProducts = categorizedProducts.filter(product => product.discountedPrice < price);

            // console.log(underPriceProducts);

            const finalProducts = underPriceProducts.filter((item) => item).sort((a, b) => {
                if (sortOption === 'price-low-high') {
                    return a.discountedPrice - b.discountedPrice;
                } else if (sortOption === 'price-high-low') {
                    return b.discountedPrice - a.discountedPrice;
                }
                // else if (sortOption === 'newest') {
                //     return new Date(b.date) - new Date(a.date);
                // }
                return 0;
            });

            setFilteredProducts(finalProducts);

            setIsLoading(false); // Reset loading state after filtering
            console.log('----filter process finished----')
        }
    }, [term, sortOption, price])

    const handlePrice = () => {
        if (term && term.length > 0) {
            let searchTerms = term.toLowerCase().split(' ');
            searchTerms.forEach(eachterm => {
                eachterm = eachterm.toLocaleLowerCase();
                if (eachterm === 'mens' || eachterm === 'men') {
                    setMainCategory('mens');
                    setMinPrice(140);
                    setPrice(3000);
                    setMaxPrice(7000);
                } else if (eachterm === 'womens' || eachterm === 'women') {
                    setMainCategory('womens');
                    setMinPrice(140);
                    setPrice(7000);
                    setMaxPrice(20000);
                } else if (eachterm === 'mobile' || ['apple', 'iphone', 'samsung'].some(brand => brand.includes(eachterm))) {
                    setMinPrice(190);
                    setPrice(125000);
                    setMaxPrice(150000);
                } else {
                    setMinPrice(100);
                    setPrice(7000);
                    setMaxPrice(20000);
                }
            })
        }
    }
    const handleSortChange = (value) => {
        console.log('sort option triggered :: ', value)
        setSortOption(value);
    };

    return (
        <div className='container mt-3'>
            <p>Results for '{term}' {`(found ${filteredProducts.length} products)`}</p>
            <section className="py-2">
                <Row>
                    <Col className="d-block d-md-none">
                        <div>
                            <p style={{ marginBottom: '0px' }}>
                                <input type="range" id="price" name="price" value={price} min={minPrice} max={maxPice} onChange={e => setPrice(Number(e.target.value))} style={{ cursor: 'pointer' }}
                                />
                            </p>
                            <p>
                                <tag className="fw-semibold">Below :</tag> ₹{new Intl.NumberFormat('en-IN').format(price)}
                            </p>
                        </div>
                    </Col>
                    <Col md={3} className="d-none d-md-block">
                        <div>
                            <p style={{ marginBottom: '0px' }}>
                                <input type="range" id="price" name="price" value={price} min={minPrice} max={maxPice} onChange={e => setPrice(Number(e.target.value))} style={{ cursor: 'pointer' }}
                                />
                            </p>
                            <p>
                                <span className="fw-semibold">Below :</span> ₹{new Intl.NumberFormat('en-IN').format(price)}
                            </p>
                        </div>

                        <Dropdown >
                            <Dropdown.Toggle variant="" className="w-100 text-decoration-none text-dark ">
                                <span className="fw-semibold">Sort</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100">
                                {sortOptions.map((option) => (
                                    <Dropdown.Item
                                        key={option.value}
                                        onClick={() => handleSortChange(option.value)}
                                        active={sortOption === option.value}
                                    >
                                        {option.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col md={9}>
                        <Row className='pb-4'>
                            {isLoading ? (
                                <div>Loading Products...</div>
                            ) :
                                (
                                    filteredProducts.length === 0 ?
                                        <h1>No items found</h1>
                                        : filteredProducts.map((product, idx) => (
                                            <Col key={idx} xs={6} sm={4} md={4} lg={3}>
                                                <ProductCard product={product} />
                                            </Col>
                                        )))
                            }
                        </Row>
                    </Col>
                </Row>
            </section>
            <Row className='footer fixed-bottom bg-white d-md-none' style={{ bottom: '20px' }}>
                <div className="d-flex justify-content-evenly align-items-center">
                    <Dropdown>
                        <Dropdown.Toggle variant="link" className="text-decoration-none text-dark">
                            Sort
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            {sortOptions.map((option) => (
                                <Dropdown.Item
                                    key={option.value}
                                    onClick={() => handleSortChange(option.value)}
                                    active={sortOption === option.value}
                                >
                                    {option.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="link" className="text-decoration-none ms-3 " onClick={() => ''}>
                        <span className="sr-only fs-6 text-dark">Filters</span>
                        <Filter size={25} color='black' />
                    </Button>
                </div>
            </Row>
        </div>
    );
}

const ProductCard = ({ product }) => {

    const { addToCart } = useUserContext();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card className="mb-4">
            <Card.Img style={{ objectFit: 'contain' }} variant="top" src={product.imageUrl || product.image} alt={product.title} />
            <Card.Body>
                <Card.Title id='product-card-title'>{product.title}</Card.Title>
                <Card.Text>
                    <span>id : {product.id}</span>
                    <span className='d-md-block' id="disc-price">{product.discountedPrice ? `₹${new Intl.NumberFormat('en-IN').format(product.discountedPrice)}` : `${new Intl.NumberFormat('en-IN').format(product.selling_price)}`}</span>
                    <span className="text-decoration-line-through">{`₹${new Intl.NumberFormat('en-IN').format(product.price)}`}</span>
                    <span className="text-success"> {product.discountPercent}% off</span>
                </Card.Text>
                <button className="btn btn-light w-100" onClick={handleAddToCart}><CartPlus color="#81D4FA" size={20} /></button>
            </Card.Body>
        </Card>
    );
};

export default SearchResults;
