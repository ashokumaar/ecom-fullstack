import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Accordion, Container, Form, Dropdown, Card, Button } from "react-bootstrap";
import { X, Filter, CartPlus } from 'react-bootstrap-icons';
import { useUserContext } from "../../SpringSecurityComponents/UserContext";
import navigation from './Datastructure'
import '../../CSS/Products.css'

const filters = {
    brands: ['Iqoo', 'Samsung', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Apple'],
    colors: ['White', 'Black', 'Blue', 'Red'],
};

const sortOptions = [
    // { name: 'Most Popular', value: 'most-popular' },
    // { name: 'Best Rating', value: 'best-rating' },
    // { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price-low-high' },
    { name: 'Price: High to Low', value: 'price-high-low' },
];

const Shopping = ({ product }) => {
    const { electronicsProducts } = useUserContext();
    // Initial state includes "All" as the default selection
    const [category, setCategory] = useState("All");
    const [subcategory, setSubcategory] = useState("");
    const [thirdCategory, setThirdCategory] = useState("");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({ brands: [], colors: [], sizes: [] });
    const [sortOption, setSortOption] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isChecked, setIsChecked] = useState(false); // Control form visibility
    const [isFiltersOccur, setIsFiltersOccur] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [sectionIndex, setSectionIndex] = useState(0);
    const [itemsIndex, setItemsIndex] = useState(0);
    const [price, setPrice] = useState(140000);
    const [isLoading, setIsLoading] = useState(true); // Flag for loading state

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true); // Start loading state
            try {
                const data = electronicsProducts;
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setIsLoading(false); // End loading state
            }
        };
        fetch();
    }, [electronicsProducts]);

    useEffect(() => {

        let tempProducts = products;

        setIsLoading(true); // Reset loading state after filtering
        if (category && category !== "All") {
            tempProducts = tempProducts.filter(
                (product) => product.topLevelCategory === category
            );
        }

        if (subcategory) {
            tempProducts = tempProducts.filter(
                (product) => product.secondLevelCategory.includes(subcategory)
            );
        }

        if (thirdCategory) {
            tempProducts = tempProducts.filter(
                (product) => {
                    if (subcategory === 'Brands') {
                        return product.brand.toLowerCase() === thirdCategory;
                    } else {
                        return product.thirdLevelCategory === thirdCategory;
                    }
                }
            );
        }

        const underPriceProducts = tempProducts.filter((product) => {
            if (product.discountedPrice) {
                return product.discountedPrice < price;
            } else {
                return product.selling_price < price;
            }
        })

        const filteredProducts = underPriceProducts.filter((product) => {
            const matchesBrands = selectedFilters.brands.length === 0 ||
                selectedFilters.brands.some(eachBrand => product.brand.toLowerCase() === eachBrand.toLowerCase());

            const matchesColors = selectedFilters.colors.length === 0 ||
                selectedFilters.colors.some(eachColor => product.color.toLowerCase() === eachColor.toLowerCase());

            return matchesBrands && matchesColors;
        });

        const finalProducts = filteredProducts.filter((item) => item).sort((a, b) => {
            if (sortOption === 'price-low-high') {
                return a.discountedPrice - b.discountedPrice;
            } else if (sortOption === 'price-high-low') {
                return b.discountedPrice - a.discountedPrice;
            }
            return 0;
        });

        setFilteredProducts(finalProducts);

        setIsLoading(false); // Reset loading state after filtering

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
        setSortOption(value);
    };

    const setIndexFun1 = (event) => {
        const selectedCategory = event.target.value;
        const mainCatArr = ['Mobiles', 'Smartwatches', 'Laptops', 'Tablets', 'All'];
        mainCatArr.filter(each => {
            if (each.match(selectedCategory)) {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const comingValue = selectedOption.getAttribute('data-categoryIndex');
                if (comingValue !== '100') {
                    setCategoryIndex(comingValue);
                } else {
                    setCategoryIndex(0);
                }
            }
            return '';
        })

    }
    const setIndexFun2 = (event) => {
        const selectedCategory = event.target.value;
        const subCatArr = navigation.categories[categoryIndex].sections;
        subCatArr.filter(each => {
            if (each.name.match(selectedCategory)) {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const comingValue = selectedOption.getAttribute('data-categoryindex');
                if (comingValue !== '100') {
                    setSectionIndex(comingValue);
                } else {
                    setSectionIndex(0);
                }
            }
            return '';
        })

    }
    const setIndexFun3 = (event) => {
        const selectedCategory = event.target.value;
        const thirdCatArr = navigation.categories[categoryIndex].sections[sectionIndex].items;
        thirdCatArr.filter(each => {
            if (each.name.match(selectedCategory)) {
                const selectedOption = event.target.options[event.target.selectedIndex];
                const comingValue = selectedOption.getAttribute('data-categoryindex');
                if (comingValue !== '100') {
                    setItemsIndex(comingValue);
                } else {
                    setItemsIndex(0);
                }
            }
            return '';
        })

    }


    console.log("categoryIndex : ", categoryIndex);
    console.log("sectionIndex : ", sectionIndex);
    console.log("itemsIndex : ", itemsIndex);


    return (
        <Container>
            <Modal show={mobileFiltersOpen} onHide={() => setMobileFiltersOpen(false)} dialogClassName="modal-dialog-scrollable">
                <Modal.Header className='justify-content-between' style={{ borderBottom: '0px' }}>
                    <Modal.Title>Filters</Modal.Title>
                    <button variant="link" onClick={() => setMobileFiltersOpen(false)} className="text-decoration-none">
                        <X size={24} color='black' />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleFilterSubmit(e)} onReset={(e) => handleFilterReset(e)}>
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
                <Row className="rounded-bottom rounded">
                    <Row className="d-flex align-items-center">
                        <Col ><strong>Main Category</strong></Col>
                        <Col ><strong>Sub Category</strong></Col>
                        <Col><strong>Third Category</strong></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    value={category}
                                    // onSelect={}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSubcategory(""); // Reset subcategory
                                        setThirdCategory(""); // Reset thirdCategory
                                        setIndexFun1(e);
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
                                        setIndexFun2(e);
                                    }}
                                    disabled={!category || category === "All"}
                                >
                                    <option value="" data-categoryindex={100}>Select Subcategory : </option>
                                    {category === navigation.categories[categoryIndex].name && (
                                        navigation.categories[categoryIndex].sections.map((eachSection, index) => {
                                            return <option value={eachSection.name} data-categoryindex={index} key={index}>{eachSection.name}</option>
                                        })
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select"
                                    value={thirdCategory}
                                    onChange={(e) => {
                                        setThirdCategory(e.target.value)
                                        setIndexFun3(e);
                                    }}
                                    disabled={!subcategory}
                                >
                                    <option value="" data-categoryindex={100}>Select Third Category : </option>
                                    {subcategory === navigation.categories[categoryIndex].sections[sectionIndex].name && category === navigation.categories[categoryIndex].name && (
                                        navigation.categories[categoryIndex].sections[sectionIndex].items.map((eachItem, index) => {
                                            return <option value={eachItem.id} data-categoryindex={index} key={index}>{eachItem.name}</option>
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
                                <input type="range" id="price" name="price" value={price} min="200" max="140000" onChange={e => setPrice(Number(e.target.value))} style={{ cursor: 'pointer' }}
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
                                <div>Loading...</div>
                            ) : (
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <Col key={index} xs={6} sm={4} md={4} lg={3}>
                                            <ProductCard product={product} />
                                        </Col>))) : (<div>No products available</div>)
                            )}
                        </Row>
                    </Col>
                </Row>
            </section>

            <Row className='footer fixed-bottom bg-white d-md-none' style={{ bottom: '15px' }}>
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
                    <span id="disc-price">{product.discountedPrice ? `₹${new Intl.NumberFormat('en-IN').format(product.discountedPrice)}` : `${new Intl.NumberFormat('en-IN').format(product.selling_price)}`}</span>
                    <span className="text-decoration-line-through">{`₹${new Intl.NumberFormat('en-IN').format(product.price)}`}</span>
                    <span className="text-success"> {product.discountPercent}% off</span>
                </Card.Text>
                <button className="btn btn-light w-100" onClick={handleAddToCart}><CartPlus color="#81D4FA" size={20} /></button>

            </Card.Body>
        </Card>
    );
};

export default Shopping;
