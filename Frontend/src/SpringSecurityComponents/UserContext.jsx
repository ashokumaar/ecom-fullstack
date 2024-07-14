import React, { useContext, useState, useEffect, useMemo } from 'react';
import {  isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom';
import { getCartByUserId, createCart, addItemToCart, updateCartItemQuantity, removeItem } from '../APIs/AuthServiceAPIs';
import { getAllProducts1 } from '../APIs/BooksAPIs'
import { getAllProducts2 } from '../APIs/ElectonicsAPIs'
import { getAllProducts3 } from '../APIs/FashionStoreAPIs';
import { toast } from 'react-toastify';

export const UserContext = React.createContext({
    jwtToken: null,
    user: {},
    cart: {},
    cartItems: [],
    handleSetJwtToken: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    totalItems: 0,
    totalAmount: 0,
    products: [],
    booksProducts: [],
    electronicsProducts: [],
    fashionProducts: [],
});

export const UserContextProvider = ({ children }) => {
    const [jwtToken, setJwtToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);
    const [itemsForPayment, setItemsForPayment] = useState([]);
    const [paymentAmount, setPaymentAmount] = useState(0);
    // const [products, setProducts] = useState([]);
    const [fashionProducts, setFashionProducts] = useState([]);
    const [booksProducts, setBooksProducts] = useState([]);
    const [electronicsProducts, setElectronicsProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(null);

    const isMyTokenExpired = isExpired(jwtToken)

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const [productResponse1, productResponse2, productResponse3] = await Promise.all([
                getAllProducts1(),
                getAllProducts2(),
                getAllProducts3()
            ]);
            const productData1 = productResponse1.data;
            const productData2 = productResponse2.data;
            const productData3 = productResponse3.data;
            setBooksProducts(productData1);
            setElectronicsProducts(productData2);
            setFashionProducts(productData3);
            // Store in local storage for caching
            localStorage.setItem('booksProducts', JSON.stringify(productData1));
            localStorage.setItem('electronicsProducts', JSON.stringify(productData2));
            localStorage.setItem('fashionProducts', JSON.stringify(productData3));
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        const cachedBooksProducts = JSON.parse(localStorage.getItem('booksProducts'));
        const cachedElectronicsProducts = JSON.parse(localStorage.getItem('electronicsProducts'));
        const cachedFashionProducts = JSON.parse(localStorage.getItem('fashionProducts'));
        if (cachedBooksProducts && cachedFashionProducts && cachedElectronicsProducts) {
            setBooksProducts(cachedBooksProducts);
            setElectronicsProducts(cachedElectronicsProducts);
            setFashionProducts(cachedFashionProducts);
        } else {
            fetchProducts();
        }
    }, []);

    const products = useMemo(() => {
        return [...booksProducts, ...fashionProducts, ...electronicsProducts];
    }, [booksProducts, fashionProducts, electronicsProducts]);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setJwtToken(storedToken);
            if (jwtToken && !isMyTokenExpired) {
                console.log('.');
                setUserId(localStorage.getItem('UserId'));
                console.log('.');
            } else if (jwtToken) {
                toast.warn('your session has expired, please login again! ', { autoClose: 3000 })
                localStorage.removeItem('UserId');
                localStorage.removeItem('User Details');
                sessionStorage.removeItem('User Details');
                sessionStorage.removeItem('address added');
                sessionStorage.removeItem('address updated');
                localStorage.removeItem('isAdmin');
                sessionStorage.setItem('SessionExpired', true);

                // navigate('/');
            }
        }
    }, [jwtToken]);

    useEffect(() => {
        console.log(jwtToken, userId);
        const storedToken = localStorage.getItem('jwtToken');
        const userid = localStorage.getItem('UserId');
        console.log(storedToken, userid);
        if (jwtToken && userId) {
            fetchProductsAndCart(jwtToken, userId);
        } else if (storedToken && userid) {
            fetchProductsAndCart(storedToken, userid);
        }
    }, [jwtToken, userId]);

    const fetchProductsAndCart = async (token, userId) => {
        try {
            const userId2 = localStorage.getItem('UserId');
            if (userId) {
                console.log('userId found.');
                getCartByUserId2(userId, token);
            } else if (userId2) {
                console.log('userId2 found.');
                getCartByUserId2(userId2, token);
            } else {
                console.log('user id not found.');
            }
        } catch (error) {
            console.error('Failed to fetch products or cart:', error);
        }
    };

    const getCartByUserId2 = async (id, token) => {
        try {
            const response = await getCartByUserId(id, token);
            if (response.status === 200) {
                const data = response.data;
                handleSetCart(data);
                const items = data.items.map((item) => {
                    const product = products.find((product) => item.product.id === product.id);
                    return product ? { ...product, quantity: item.quantity, itemId: item.id } : null;
                }).filter(Boolean);
                console.log('cart items from backend', items);
                setCartItems(items);
                setTotalItems(items.length);
                updateTotalAmount(items);
            }
        } catch (error) {
            const cart = { userId: id };
            await createCart2(cart, token);
        }
    };

    const createCart2 = async (payload, token) => {
        try {
            const response = await createCart(payload, token);
            console.log(response);
            const storedToken = localStorage.getItem('jwtToken');
            const userid = localStorage.getItem('UserId');
            if (storedToken && userid) {
                fetchProductsAndCart(storedToken, userid);
            }
        } catch (error) {
            console.error('Failed to create cart:', error);
        }
    };

    const updateTotalAmount = (items) => {
        const amount = items.reduce((accumulator, item) => {
            return accumulator + item.discountedPrice * item.quantity;
        }, 0);
        setCartAmount(amount);
    };

    const handleSetJwtToken = (newToken) => {
        setJwtToken(newToken);
        localStorage.setItem('jwtToken', newToken);
    };

    const handleSetUser = (comingUser) => {
        setUser(comingUser);
        localStorage.setItem('UserId', comingUser.userId);
        fetchProductsAndCart(localStorage.getItem('jwtToken'), localStorage.getItem('UserId'));
    };

    const handleSetCart = (comingCart) => {
        setCart(comingCart);
    };

    const handlePaymentItems = (items) => {
        setItemsForPayment(items);
        const amount = items.reduce((accumulator, item) => {
            return accumulator + item.discountedPrice * item.quantity;
        }, 0);
        setPaymentAmount(amount);
    }

    const handleLogin = (newToken) => {
        handleSetJwtToken(newToken);
        sessionStorage.removeItem('hasLoggedOut');
    };

    const handleAdmin = () => {
        localStorage.setItem('isAdmin', true);
        setIsAdmin(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserId');
        sessionStorage.removeItem('User Details');
        sessionStorage.removeItem('address added');
        sessionStorage.removeItem('address updated');
        sessionStorage.removeItem('selected address for payment');
        localStorage.removeItem('isAdmin');
        setJwtToken(null);
        setUser(null);
        setUserId(null);
        setIsAdmin(null);
        setCart({})
        setCartItems([]);
        setItemsForPayment([]);
        setTotalItems(0);
        setCartAmount(0);
    };

    const addToCart = async (product, quantity = 1) => {
        if (!cart.id) {
            console.error('Cart ID is not available');
            navigate('/auth/login');
            return;
        }
        const payload = {
            product: {
                id: product.id,
                title: product.title
            },
            quantity
        };
        try {
            const response = await addItemToCart(cart.id, payload, jwtToken);
            if (response && response.status === 200) {
                fetchProductsAndCart(jwtToken, userId);
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        const item = cart.items.find(item => item.product.id === productId);
        if (item) {
            const itemId = item.id;
            try {
                const response = await removeItem(itemId, jwtToken);
                if (response && response.status === 200) {
                    setCartItems((prevCartItems) => {
                        const updatedCartItems = prevCartItems.filter((item) => item.id !== productId);
                        setTotalItems(updatedCartItems.length);
                        updateTotalAmount(updatedCartItems);
                        return updatedCartItems;
                    });
                }
            } catch (error) {
                console.error('Failed to remove the item:', error);
            }
        } else {
            console.error(`Item with product ID ${productId} not found in cart.`);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        const item = cart.items.find(item => item.product.id === productId);
        if (item) {
            const itemId = item.id;
            try {
                const response = await updateCartItemQuantity(cart.id, itemId, newQuantity, jwtToken);
                if (response && response.status === 200) {
                    setCartItems((prevCartItems) => {
                        const updatedCartItems = prevCartItems.map((item) =>
                            item.id === productId ? { ...item, quantity: newQuantity } : item
                        );
                        updateTotalAmount(updatedCartItems);
                        return updatedCartItems;
                    });
                }
            } catch (error) {
                console.error('Failed to update item quantity:', error);
            }
        } else {
            console.error(`Item with product ID ${productId} not found in cart.`);
        }
    };

    return (
        <UserContext.Provider
            value={{
                jwtToken,
                user,
                cart,
                cartItems,
                itemsForPayment,
                handleSetUser,
                handlePaymentItems,
                handleLogin,
                handleLogout,
                handleAdmin,
                addToCart,
                removeFromCart,
                updateQuantity,
                totalItems,
                cartAmount,
                paymentAmount,
                products,
                booksProducts,
                electronicsProducts,
                fashionProducts,
                isAdmin
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
