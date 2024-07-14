import React, { useState } from 'react';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, handlePaymentItems, totalItems, cartAmount } = useUserContext();
    const [checkedItems, setCheckedItems] = useState([]);
    const navigate = useNavigate();

    // Handle checkbox change
    const handleCheck = (id, checked) => {
        setCheckedItems((prevCheckedItems) =>
            checked ? [...prevCheckedItems, id] : prevCheckedItems.filter((itemId) => itemId !== id)
        );
    };

    // Handle displaying cart items (assuming 'CartItem' component exists)
    const renderCartItems = () => {
        return cartItems.map((item, index) => (
            <CartItem key={index} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} onCheck={handleCheck} />
        ));
    };

    const checkOut = () => {
        console.log('placing order steps : address select');
        const itemsForPayment = cartItems.filter(item => checkedItems.includes(item.id));
        handlePaymentItems(itemsForPayment);
        navigate('/addressList');
    }

    return (
        <div className="cart py-4">
            <h2>Cart Items</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className='list-group my-3'>{renderCartItems()}</ul>
            )}
            {cartItems.length > 0 && (
                <div className='p-3' style={{ backgroundColor: '#EFEBE9' }}>
                    <p>Total items: {totalItems}</p>
                    <p>Total cart items value: ₹{new Intl.NumberFormat('en-IN').format(cartAmount)}</p>
                    <button className="btn btn-light border-secondary-subtle" onClick={checkOut}>proceed to checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;


export const CartItem = ({ item, onRemove, onUpdate, onCheck }) => {
    const { imageUrl, title, discountedPrice } = item;

    const handleRemove = () => {
        onRemove(item.id); // Call the removal function provided as a prop
    };

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            onUpdate(item.id, item.quantity - 1); // Call the update function with new quantity
        }
    };
    const increaseQuantity = () => {
        onUpdate(item.id, item.quantity + 1); // Call the update function with new quantity
    };

    const handleCheck = (e) => {
        onCheck(item.id, e.target.checked); // Call the check function with the item's id and checked status
    };

    const checkboxId = `checkbox-${item.id}`; // Generate unique id for each checkbox

    return (
        <li className="list-group-item cart-item mx-3" key={item.id}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value={item.id}
                        id={checkboxId} // Use unique id
                        onChange={handleCheck}
                    />
                </div>
                <div className="col-auto">
                    <img src={imageUrl} alt={title} className="object-fit-fill border rounded me-3" />
                </div>
                <div className="col">
                    <div className="cart-item-info">
                        {/* <span>id: {item.id}</span> */}
                        <h6>{title}</h6>
                        <p>Price: ₹{new Intl.NumberFormat('en-IN').format(discountedPrice)}</p>
                        <p>
                            Quantity: &nbsp;
                            <button className="rounded-start btn btn-light" onClick={decreaseQuantity}>−</button>
                            {item.quantity}&nbsp;
                            <button className="btn btn-light" onClick={increaseQuantity}>+</button>&nbsp;
                        </p>
                        <button className="btn btn-light border-secondary-subtle mt-2" onClick={handleRemove}>Remove</button>
                    </div>
                </div>
            </div>
        </li>
    );
};
