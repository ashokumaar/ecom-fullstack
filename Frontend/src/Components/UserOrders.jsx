import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../APIs/AuthServiceAPIs';
import '../CSS/UserOrders.css';
import { toast } from 'react-toastify';

const UserOrders = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('UserId');
        try {
            if (userId && jwtToken) {
                const response = await getOrdersByUserId(userId, jwtToken);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data);
                    const updatedOrder = data.map(order => {
                        const formattedDate = modifyDate(order.createdAt);
                        return { ...order, 'createdAt': formattedDate }
                    })
                    console.log(updatedOrder);
                    updatedOrder.sort((a, b) => b.orderId - a.orderId);
                    setOrders(updatedOrder);
                }
            } else {
                toast.error('please login to check your orders', { autoClose: 3000 });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const modifyDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Use 24-hour format
            timeZoneName: 'short'
        });
    }

    const getStatusStepClass = (currentStatus, targetStatus) => {
        const statusOrder = ['Order confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
        const currentStatusIndex = statusOrder.indexOf(currentStatus);
        const targetStatusIndex = statusOrder.indexOf(targetStatus);

        if (targetStatusIndex <= currentStatusIndex) {
            return 'completed';
        } else {
            return 'pending';
        }
    };

    return (
        <div className="container mb-5">
            <h2>Order History</h2>
            {orders && orders.map(order => (
                <div key={order.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title mb-2" id='card-title'>Order #{order.orderId}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Order Date: {order.createdAt}</h6>
                        <div className="row">
                            {order.items.map((item, index) => (
                                <div key={item.id} className="col-md-12">
                                    {index > 0 && <hr />}
                                    <div className="card-subtitle mb-2 text-muted">
                                        last updated at: {modifyDate(item.updatedAt)}
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center px-4">
                                        <div className={`circle ${getStatusStepClass(item.status, 'Order Confirmed')}`}>
                                            {getStatusStepClass(item.status, 'Order Confirmed') === 'completed' ? '✓' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(item.status, 'Shipped')}`}></div>
                                        <div className={`circle ${getStatusStepClass(item.status, 'Shipped')}`}>
                                            {getStatusStepClass(item.status, 'Shipped') === 'completed' ? '✓' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(order.status, 'Out for Delivery')}`}></div>
                                        <div className={`circle ${getStatusStepClass(order.status, 'Out for Delivery')}`}>
                                            {getStatusStepClass(order.status, 'Out for Delivery') === 'completed' ? '✓' : ''}
                                        </div>
                                        <div className={`line ${getStatusStepClass(order.status, 'Delivered')}`}></div>
                                        <div className={`circle ${getStatusStepClass(order.status, 'Delivered')}`}>
                                            {getStatusStepClass(order.status, 'Delivered') === 'completed' ? '✓' : ''}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mt-2'>
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
                                    <br />
                                    <p>{item.product.title}<tag className='fw-medium'> x {item.units}</tag></p>
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
