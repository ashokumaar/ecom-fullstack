import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Accordion, Container, Form, Dropdown, Card, Button } from "react-bootstrap";
import { X, Filter, CartPlus } from 'react-bootstrap-icons';
import { useUserContext } from "../../SpringSecurityComponents/UserContext";
import mensJeans from '../../Data/MensJeans.json';
import mensKurta from '../../Data/MensKurta.json';
import mensShirts from '../../Data/MensShirts.json';
// import shoes from '../Data/Shoes.json';
import womensDress from '../../Data/WomensDress.json';
import womensJeans from '../../Data/WomensJeans.json';
import womensTops from '../../Data/WomensTops.json';
import navigation from './Datastructure'
import '../../CSS/Products.css'

console.log(navigation.categories)

const allItems = []

allItems.push(...mensJeans, ...mensKurta, ...mensShirts, ...womensDress, ...womensJeans, ...womensTops)

const filters = {
    brands: ['Tokyo Talkies', 'PETER ENGLAND', 'FUBAR', 'HIGHLANDER', 'KOTTY', 'Aarvia', `LEVI'S`, 'Majestic Man', 'Vida Loca', 'linaria'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    sizes: ['S', 'M', 'L']
};

const sortOptions = [
    // { name: 'Most Popular', value: 'most-popular' },
    // { name: 'Best Rating', value: 'best-rating' },
    // { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price-low-high' },
    { name: 'Price: High to Low', value: 'price-high-low' },
];

const Shopping = ({ product }) => {
    // Initial state includes "All" as the default selection
    const [category, setCategory] = useState("All");
    const [subcategory, setSubcategory] = useState("");
    const [thirdCategory, setThirdCategory] = useState("");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({ brands: [], colors: [], sizes: [] });
    const [sortOption, setSortOption] = useState(' ');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false); // Control form visibility
    const [isFiltersOccur, setIsFiltersOccur] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [sectionIndex, setSectionIndex] = useState(0);
    const [price, setPrice] = useState(1000);
    const [isLoading, setIsLoading] = useState(false); // Flag for loading state

    useEffect(() => {
        setProducts(allItems);
        setFilteredProducts(allItems)
    }, [])

    useEffect(() => {
        // Filter logic based on category, subcategory, and thirdCategory
        let tempProducts = products;

        // const brandMap = tempProducts.reduce((acc, product) => {
        //     // Initialize count to 1 if brand doesn't exist in acc
        //     acc[product.brand] = (acc[product.brand] || 0) + 1;
        //     return acc;
        // }, {});
        // const brandCountArray = [];
        // for (const brand in brandMap) {
        //     if (brandMap.hasOwnProperty(brand)) {
        //         brandCountArray.push([brand, brandMap[brand]]);
        //     }
        // }
        // const top10Brands = brandCountArray.sort((a, b) => b[1] - a[1]).slice(0, 10);
        // const top10BrandNames = top10Brands.map(item => item[0]);
        // console.log(top10BrandNames);

        setIsLoading(true); // Reset loading state after filtering
        if (category && category !== "All") {
            tempProducts = tempProducts.filter(
                (product) => product.topLavelCategory === category
            );
        }

        if (subcategory) {
            tempProducts = tempProducts.filter(
                (product) => {
                    if (subcategory === 'Clothing')
                        return product.secondLavelCategory;
                    else if (subcategory === 'Brands')
                        return product.brand;
                    else
                        return product.accessories;

                }
            );
        }

        if (thirdCategory) {
            tempProducts = tempProducts.filter(
                (product) => {
                    if (subcategory === 'Clothing')
                        return product.thirdLavelCategory === thirdCategory;
                    else if (subcategory === 'Brands')
                        return product.brand === thirdCategory;
                    else
                        return product.accessories === thirdCategory;
                }
            );
        }

        const underPriceProduts = tempProducts.filter((product) => {
            if (product.discountedPrice) {
                return product.discountedPrice < price;
            } else {
                return product.selling_price < price;
            }
        })

        const filteredProducts = underPriceProduts.filter((product) => {
            const matchesBrands = selectedFilters.brands.length === 0 ||
                selectedFilters.brands.some(eachBrand => product.brand.toLowerCase() === eachBrand.toLowerCase());

            const matchesColors = selectedFilters.colors.length === 0 ||
                selectedFilters.colors.some(eachColor => product.color.toLowerCase() === eachColor.toLowerCase());

            // Improved size matching logic (optional):
            const matchesSizes = selectedFilters.sizes.length === 0 ||
                product.size.some(productSize => selectedFilters.sizes.includes(productSize.name));

            return matchesBrands && matchesColors && matchesSizes;
        });

        const finalProducts = filteredProducts.filter((item) => item).sort((a, b) => {
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
        console.log('triggered::::')

    }, [category, subcategory, thirdCategory, price, isFiltersOccur, sortOption, products]);

    const handleFormToggle = () => setIsChecked(!isChecked); // Toggle form state

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (newFilters[type].includes(value)) {
                newFilters[type] = newFilters[type].filter((item) => item !== value);
            } else {
                newFilters[type] = [...newFilters[type], value];
            }
            console.log("newFilters :: ", newFilters);
            return newFilters;
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setIsFiltersOccur(!isFiltersOccur);
    }

    const handleFilterReset = (e) => {
        e.preventDefault();
        setSelectedFilters({ brands: [], colors: [], sizes: [] })
        setIsFiltersOccur(!isFiltersOccur);
    }

    const handleSortChange = (value) => {
        console.log('sort option triggered :: ', value)
        setSortOption(value);
    };

    const randomFun = (event) => {
        const selectedCategory = event.target.value;
        const mainCatArr = ['Men', 'Women', 'All'];
        const subCatArr = ['Clothing', 'Accessories', 'Brands'];
        mainCatArr.filter(each => {
            if (each.match(selectedCategory)) {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const comingValue = selectedOption.getAttribute('data-categoryIndex');
                console.log('selected category index from events : ', comingValue);
                if (comingValue === '0' || comingValue === '1') {
                    console.log("setting category index", comingValue)
                    setCategoryIndex(comingValue);
                } else {
                    setCategoryIndex(0);
                }
            }
            return '';
        })
        subCatArr.filter(each => {
            if (each.match(selectedCategory)) {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const comingValue = selectedOption.getAttribute('data-categoryindex');
                console.log('selected sub category index from events : ', comingValue);
                if (comingValue === '0' || comingValue === '1' || comingValue === '2') {
                    console.log("setting subcategory index", comingValue)
                    setSectionIndex(comingValue);
                } else {
                    setSectionIndex(0);
                }
            }
            return '';
        })

    }

    console.log("categoryIndex : ", categoryIndex);

    return (
        <Container>
            <Modal show={mobileFiltersOpen} onHide={() => setMobileFiltersOpen(false)} dialogClassName="modal-dialog-scrollable">
                <Modal.Header className='justify-content-between' style={{ borderBottom: '0px' }}>
                    <Modal.Title>Filters</Modal.Title>
                    <Button variant="link" onClick={() => setMobileFiltersOpen(false)} className="text-decoration-none">
                        <X size={24} color='black' />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleFilterSubmit(e)} onReset={(e) => handleFilterReset(e)}>
                        {/* <h3 className="sr-only">Filters</h3> */}
                        {Object.entries(filters).map(([type, options]) => (
                            <Accordion key={type}>
                                <Accordion.Item eventKey={type}>
                                    <Accordion.Header>{type.charAt(0).toUpperCase() + type.slice(1)}</Accordion.Header>
                                    <Accordion.Body>
                                        {options.map((option) => (
                                            <Form.Check
                                                key={option}
                                                type="checkbox"
                                                id={`filter-${type}-${option}`}
                                                label={option}
                                                checked={selectedFilters[type].includes(option)}
                                                onChange={() => handleFilterChange(type, option)}
                                            />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))}
                        <div className="d-flex justify-content-center p-2">
                            <button type="reset" className="rounded-start border border-info-subtle" onReset={(e) => handleFilterReset(e)}>Reset</button>
                            <button type="submit" className="rounded-end  border border-info-subtle" onSubmit={(e) => handleFilterSubmit(e)}>Submit</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Form>
                <Row className="rounded-bottom rounded" style={{ borderBottom: '1px solid #E7EEEF' }}>
                    <Row className="d-flex align-items-center">
                        <Col ><strong>Main Category</strong></Col>
                        <Col ><strong>Sub Category</strong></Col>
                        <Col><strong>Third Category</strong></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                {/* <Form.Label>Main Category</Form.Label> */}
                                <Form.Control
                                    as="select"
                                    value={category}
                                    // onSelect={}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSubcategory(""); // Reset subcategory
                                        setThirdCategory(""); // Reset thirdCategory
                                        randomFun(e);
                                    }}
                                >
                                    <option value="All" data-categoryindex={100}>All</option>
                                    {
                                        navigation.categories.map((eachCategory, index) => {
                                            return <option value={eachCategory.name} key={index} data-categoryindex={index}>
                                                {eachCategory.name}
                                            </option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    value={subcategory}
                                    onChange={(e) => {
                                        setSubcategory(e.target.value);
                                        setThirdCategory(""); // Reset thirdCategory
                                        randomFun(e);
                                    }}
                                    disabled={!category || category === "All"}
                                >
                                    <option value="" data-categoryindex={100}>Select Subcategory : </option>
                                    {category === navigation.categories[categoryIndex].name && (
                                        navigation.categories[categoryIndex].sections.map((eachSection, index) => {
                                            return <option value={eachSection.name} data-categoryindex={index}>{eachSection.name}</option>
                                        })
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                {/* <Form.Label>Third Category</Form.Label> */}
                                <Form.Control
                                    as="select"
                                    value={thirdCategory}
                                    onChange={(e) => {
                                        setThirdCategory(e.target.value)
                                    }}
                                    disabled={!subcategory}
                                >
                                    <option value="">Select Third Category : </option>
                                    {subcategory === navigation.categories[categoryIndex].sections[sectionIndex].name && category === navigation.categories[categoryIndex].name && (
                                        navigation.categories[categoryIndex].sections[sectionIndex].items.map((eachItem) => {
                                            return <option value={eachItem.id}>{eachItem.name}</option>
                                        })
                                    )}

                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Row>

            </Form>
            <section className="py-2">
                <Row>
                    <Col md={3} className="d-none d-md-block">
                        <div>
                            <p style={{ marginBottom: '0px' }}>
                                <input type="range" id="price" name="price" value={price} min="200" max="6000" onChange={e => setPrice(Number(e.target.value))} style={{ cursor: 'pointer' }}
                                />
                            </p>
                            <p>
                                <span className="fw-semibold">Below :</span> ₹{new Intl.NumberFormat('en-IN').format(price)}
                            </p>
                        </div>

                        <Form onSubmit={(e) => handleFilterSubmit(e)} onReset={(e) => handleFilterReset(e)}>
                            <div className="d-flex justify-content-center">
                                <div className="p-2">
                                    <h6 className="sr-only">Filters</h6>
                                </div>
                                <div className="p-2">
                                    <Form.Check
                                        type="switch"
                                        id="filter-toggle"
                                        label=""
                                        checked={isChecked}
                                        onChange={handleFormToggle}
                                    />
                                </div>
                            </div>
                            {isChecked && Object.entries(filters).map(([type, options]) => (
                                <Accordion key={type}>
                                    <Accordion.Item eventKey={type}>
                                        <Accordion.Header>{type.charAt(0).toUpperCase() + type.slice(1)}</Accordion.Header>
                                        <Accordion.Body>
                                            {options.map((option) => (
                                                <Form.Check
                                                    key={option}
                                                    type="checkbox"
                                                    id={`filter-${type}-${option}`}
                                                    label={option}
                                                    checked={selectedFilters[type].includes(option)}
                                                    onChange={() => handleFilterChange(type, option)}
                                                />
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                            {isChecked && <div className="d-flex justify-content-center p-2">
                                <button type="reset" className="rounded-start border border-info-subtle" onReset={(e) => handleFilterReset(e)}>Reset</button>
                                <button type="submit" className="rounded-end  border border-info-subtle" onSubmit={(e) => handleFilterSubmit(e)}>Submit</button>
                            </div>
                            }
                        </Form>

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
                        <Row>
                            {isLoading ? (
                                <div>Loading Products...</div>
                            ) :
                                (
                                    filteredProducts.length === 0 ?
                                        <h1>No items on your selected options</h1>
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

            <Row className='position-sticky bg-white d-md-none' style={{ bottom: '20px' }}>
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
                    <Button variant="link" className="text-decoration-none ms-3 " onClick={() => setMobileFiltersOpen(true)}>
                        <span className="sr-only fs-6 text-dark">Filters</span>
                        <Filter size={25} color='black' />
                    </Button>
                </div>
            </Row>

        </Container>
    );
};

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
                    {/* <div id='product-card-title'><strong>Brand:</strong> {product.brand}</div> */}
                    {/* <strong>Price:</strong> {product.discountedPrice ? `₹${product.discountedPrice}` : product.selling_price} <br />
                    <strong>Original Price:</strong> <s>₹{product.price}</s> <br />
                    <strong>Discount:</strong> {product.discountPersent}% off <br /> */}
                    {/* <strong>Available Sizes:</strong>{" "}
                    {product.size.map((s, idx) => (
                        <span key={idx}>{s.name}{idx < product.size.length - 1 ? ', ' : ''}</span>
                    ))} */}
                    <span id="disc-price">{product.discountedPrice ? `₹${new Intl.NumberFormat('en-IN').format(product.discountedPrice)}` : `${new Intl.NumberFormat('en-IN').format(product.selling_price)}`}</span>
                    <span className="text-decoration-line-through">{`₹${new Intl.NumberFormat('en-IN').format(product.price)}`}</span>
                    <span className="text-success"> {product.discountPersent}% off</span>
                </Card.Text>
                <button className="btn btn-light w-100" onClick={handleAddToCart}><CartPlus color="#81D4FA" size={20} /></button>

            </Card.Body>
        </Card>
    );
};

export default Shopping;
