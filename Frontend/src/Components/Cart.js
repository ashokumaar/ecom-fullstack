import React from 'react';
import { useUserContext } from '../SpringSecurityComponents/UserContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalItems, totalAmount } = useUserContext();

    // Handle displaying cart items (assuming 'CartItem' component exists)
    const renderCartItems = () => {
        return cartItems.map((item, index) => (
            <CartItem key={index} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
        ));
    };

    return (
        <div className="cart py-4">
            <h2>Cart Items</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className='my-3'>{renderCartItems()}</ul>
            )}
            {cartItems.length > 0 && (
                <div className="container cart-total p-3" style={{backgroundColor:'#EFEBE9'}}>
                    <p>Total items: {totalItems}</p>
                    <p>Total items value: ₹{new Intl.NumberFormat('en-IN').format(totalAmount)}</p>
                    <button className="btn btn-light border-secondary-subtle" >Make Payment</button>
                </div>
            )}
            {/* Add buttons or functionalities for checkout or other actions */}
        </div>
    );
};

export default Cart;


export const CartItem = ({ item, onRemove, onUpdate }) => {

    const { imageUrl, title, discountedPrice } = item;

    const handleRemove = () => {
        onRemove(item.id); // Call the removal function provided as a prop
    };

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            onUpdate(item.id, item.quantity - 1); // Call the update function with new quantity
        }
    }
    const increaseQuantity = () => {
        onUpdate(item.id, item.quantity + 1); // Call the update function with new quantity
    }

    return (
        <li className="cart-item my-3" style={{ listStyle: 'none' }} key={item.title}>
            <img src={imageUrl} alt={title} />
            <div className="cart-item-info">
                <span>id : {item.id}</span>
                <h4>{title}</h4>
                <p>Price: ₹{new Intl.NumberFormat('en-IN').format(discountedPrice)}</p>
                <p>Quantity : &nbsp;
                    <button className="rounded-start btn btn-light" onClick={decreaseQuantity}>−</button>
                    {item.quantity}&nbsp;
                    <button className="btn btn-light" onClick={increaseQuantity}>+</button>&nbsp;
                </p>
            </div>
            <button className="btn btn-light border-secondary-subtle" onClick={handleRemove}>Remove</button>
        </li>
    );
};