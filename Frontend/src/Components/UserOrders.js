import React, { useEffect, useState } from 'react';
import '../CSS/UserOrders.css'; // Import CSS file for component-specific styles

const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders(); // Function to fetch orders data
    }, []);

    const fetchOrders = () => {
        // Simulated data for demonstration
        const mockOrders = [
            {
                id: 1,
                status: 'Delivered',
                items: [
                    { id: 101, name: 'Product A', quantity: 2 },
                    { id: 102, name: 'Product B', quantity: 1 }
                ],
                date: '2024-06-23'
            },
            {
                id: 2,
                status: 'Shipped',
                items: [
                    { id: 103, name: 'Product C', quantity: 3 }
                ],
                date: '2024-06-20'
            }
        ];

        setOrders(mockOrders); // Set orders state with fetched data
    };

    const getStatusStepClass = (currentStatus, targetStatus) => {
        const statusOrder = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
        const currentStatusIndex = statusOrder.indexOf(currentStatus);
        const targetStatusIndex = statusOrder.indexOf(targetStatus);

        if (targetStatusIndex <= currentStatusIndex) {
            return 'completed';
        } 
        // else if (targetStatusIndex === currentStatusIndex) {
        //     return 'active';
        // } 
        else {
            return 'pending';
        }
    };

    return (
        <div className="container">
            <h2>Order History</h2>
            {orders.map(order => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title" id='card-title'>Order #{order.id} - {order.status}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Order Date: {order.date}</h6>
                        <div className="row">
                            {order.items.map((item, index) => (
                                <div key={item.id} className="col-md-12">
                                    {index > 0 && <hr />}
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className={`circle ${getStatusStepClass(order.status, 'Order Confirmed')}`}>
                                            {getStatusStepClass(order.status, 'Order Confirmed') === 'completed' ? '✔' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(order.status, 'Shipped')}`}></div>
                                        <div className={`circle ${getStatusStepClass(order.status, 'Shipped')}`}>
                                            {getStatusStepClass(order.status, 'Shipped') === 'completed' ? '✔' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(order.status, 'Out for Delivery')}`}></div>
                                        <div className={`circle ${getStatusStepClass(order.status, 'Out for Delivery')}`}>
                                            {getStatusStepClass(order.status, 'Out for Delivery') === 'completed' ? '✔' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(order.status, 'Delivered')}`}></div>
                                        <div className={`circle ${getStatusStepClass(order.status, 'Delivered')}`}>
                                            {getStatusStepClass(order.status, 'Delivered') === 'completed' ? '✔' : ''}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around align-items-center mt-2'>
                                        <div className={`step-text ${getStatusStepClass(order.status, 'Order Confirmed')}`}>
                                            Order Confirmed
                                        </div>
                                        <div className={`step-text ${getStatusStepClass(order.status, 'Shipped')}`}>
                                            Shipped
                                        </div>
                                        <div className={`step-text ${getStatusStepClass(order.status, 'Out for Delivery')}`}>
                                            Out for Delivery
                                        </div>
                                        <div className={`step-text ${getStatusStepClass(order.status, 'Delivered')}`}>
                                            Delivered
                                        </div>
                                    </div>
                                    <br/>
                                    <p>{item.name} x {item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;
