import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../SpringSecurityComponents/UserContext'
import { createOrder } from '../APIs/AuthServiceAPIs';

const PlaceOrder = () => {
    const { jwtToken, itemsForPayment, paymentAmount, removeFromCart } = useUserContext();
    const [address, setAddress] = useState(null);
    const [discountedAmount, setDiscountedAmount] = useState();
    const navigate = useNavigate();

    // console.log(sessionStorage.getItem('selected address for payment'));

    useEffect(() => {
        const cachedAddress = JSON.parse(sessionStorage.getItem('selected address for payment'));
        console.log(cachedAddress);
        if (cachedAddress) {
            setAddress(cachedAddress);
            toast.warning('click on payment, its not real money 😊', { autoClose: 3000 })
        }
    }, [])

    useEffect(() => {
        if (itemsForPayment) {
            console.log(itemsForPayment);
            let amount = itemsForPayment.reduce((accumulator, item) => {
                return accumulator + item.price * item.quantity;
            }, 0);
            let savedAmount = amount - paymentAmount;
            setDiscountedAmount(savedAmount);

        }
    }, [itemsForPayment])

    const makePayment = async () => {
        const userId = localStorage.getItem('UserId');
        const itemsPayload = [];
        itemsForPayment.forEach(eachItem => {
            let item = {
                "product": {
                    "id": eachItem.id,
                    "title": eachItem.title
                },
                "units": eachItem.quantity,
                "price": eachItem.discountedPrice
            }
            itemsPayload.push(item);
        })
        const payload = {
            "customerId": userId,
            "addressId": address.id,
            "totalPrice": paymentAmount,
            "items": itemsPayload
        }
        console.log(payload, jwtToken);
        try {
            const response = await createOrder(payload, jwtToken);
            if (response.status === 200 || response.status === 201) {
                itemsForPayment.forEach(eachItem => {
                    removeFromCart(eachItem.id);
                });
                toast.success('payment success', { autoClose: 3000 });
                sessionStorage.removeItem('selected address for payment');
                navigate('/orders');
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong, payment failed', { autoClose: 3000 })
        }
    }

    return (
        <div>
            {
                address && <div>
                    <div className="list-group mx-3 my-2">
                        <div className="list-group-item" key=''>
                            <tag className='fst-italic'>Delivery address : </tag>
                            {address.id},
                            <strong> {address.street}, {address.area}, </strong>
                            {address.city}, {address.state}, {address.pincode}
                        </div>
                    </div>
                    <ul className='list-group my-2'>
                        {
                            itemsForPayment && itemsForPayment.map((eachItem) => {
                                return <CartItem item={eachItem} />;
                            })
                        }
                    </ul>
                </div>
            }
            {itemsForPayment.length > 0 && (
                <div style={{ backgroundColor: '#EFEBE9' }}>
                    <p>Total items : {itemsForPayment.length}</p>
                    <p>Total value : ₹{new Intl.NumberFormat('en-IN').format(paymentAmount)} (<tag className='fst-italic'>saved : ₹{new Intl.NumberFormat('en-IN').format(discountedAmount)}</tag>)</p>
                </div>
            )}
            <div>
                <button type="button" className="btn btn-primary mx-3" onClick={makePayment}>Make payment</button>
            </div>
        </div>
    );
}

export default PlaceOrder;

export const CartItem = ({ item }) => {
    const { imageUrl, title, discountedPrice } = item;

    return (
        <li className="list-group-item cart-item mx-3" key={item.id}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <img src={imageUrl} alt={title} className="object-fit-fill border rounded me-3" />
                </div>
                <div className="col">
                    <div className="cart-item-info">
                        <span>id: {item.id}</span>
                        <h6>{title}</h6>
                        <p>Price: ₹{new Intl.NumberFormat('en-IN').format(discountedPrice)}</p>
                        <p>
                            Quantity: &nbsp;
                            {item.quantity}&nbsp;
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
