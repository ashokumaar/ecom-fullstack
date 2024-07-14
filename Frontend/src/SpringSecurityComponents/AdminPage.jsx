import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';
import '../CSS/Admin.css';
import { toast } from 'react-toastify';
import LoginForm from './LoginForm';

// Sample order steps
const orderSteps = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

const baseUrl = process.env.REACT_APP_AUTH_SERVICE_API;

const Admin = () => {
    const { isAdmin } = useUserContext();
    const [userOrders, setUserOrders] = useState([]);
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const cachedAdmin = localStorage.getItem('isAdmin');
        console.log(cachedAdmin, isAdmin);
        if (cachedAdmin || isAdmin) {
            console.log(cachedAdmin, isAdmin);
            setAdmin(true);
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                console.log(admin, jwtToken);
                fetchOrders();
            }
        } else {
            toast.error('you are not an admin');
        }
    }, []);

    const fetchOrders = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get(`${baseUrl}/orders/all`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
        const data = await response.data;
        setUserOrders(data);
    };

    const updateItemStatus = async (payload, orderId) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await axios.put(`${baseUrl}/orders/updateOrderStatus/orderId/${orderId}`, payload, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (response.status === 200) {
                setUserOrders(prevOrders => prevOrders.map(order =>
                    order.orderId === orderId
                        ? {
                            ...order,
                            items: order.items.map(item =>
                                item.orderSubId === payload.orderSubId ? { ...item, status: payload.status } : item
                            )
                        }
                        : order
                ));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getNextStepIndex = (currentStatus) => {
        return orderSteps.findIndex(step => step === currentStatus) + 1;
    };

    const updateOrderStatus = (orderId, item, newStatus) => {
        const payload = {
            'orderSubId': item.orderSubId,
            "product": {
                "title": item.product.title,
                "id": item.product.id
            },
            "units": item.units,
            "price": item.price,
            "status": newStatus
        };
        updateItemStatus(payload, orderId);
    };

    if (!admin) {
        return <LoginForm value='Login with admin credentials' />;
    }

    return (
        <div className="admin-container">
            <h2 className='mb-4'>User Orders</h2>
            {userOrders.map(order => (
                <div key={order.orderId} className="user-orders">
                    <h3>Order ID: {order.orderId}</h3>
                    <p>Customer ID: {order.customerId}</p>
                    <p>Total Price: ₹{new Intl.NumberFormat('en-IN').format(order.totalPrice)}</p>
                    <ul className='list-group'>
                        {order.items.map(item => (
                            <li key={item.orderSubId} className="list-group-item py-3 px-2">
                                <p>Product: {item.product.title}</p>
                                <p>Units: {item.units}</p>
                                <p>Price: ₹{new Intl.NumberFormat('en-IN').format(item.price)}</p>
                                <p>Current Status: {item.status}</p>
                                <div className="d-flex justify-content-between">
                                    {orderSteps.map((step, index) => {
                                        const currentStepIndex = orderSteps.findIndex(s => s === item.status);
                                        const nextStepIndex = getNextStepIndex(item.status);
                                        const isDisabled = index <= currentStepIndex || index > nextStepIndex;
                                        const isNextStep = index === nextStepIndex;

                                        return (
                                            <button
                                                key={step}
                                                disabled={isDisabled}
                                                className={`btn ${isDisabled ? 'btn-secondary' : isNextStep ? 'btn-primary' : 'btn-secondary'}`}
                                                id={`btn ${isDisabled ? 'btn-secondary' : isNextStep ? 'btn-primary' : 'btn-secondary'}`}
                                                onClick={() => updateOrderStatus(order.orderId, item, step)}
                                            >
                                                {step}
                                            </button>
                                        );
                                    })}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Admin;
