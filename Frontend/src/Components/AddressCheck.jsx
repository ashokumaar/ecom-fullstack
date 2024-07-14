import React, { useEffect, useState } from 'react';
import { getUserById } from '../APIs/AuthServiceAPIs';
import AddressForm from './AddressForm';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddressCheck = () => {

    const [user, setUser] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const navigate = useNavigate();
    // const defaultUser = {
    //     id: 1,
    //     username: 'testuser',
    //     email: 'testuser@example.com',
    //     phone: '123-456-7890',
    //     addressList: [
    //         {
    //             id: 1,
    //             street: '123 Main St',
    //             area: 'Downtown',
    //             city: 'Anytown',
    //             state: 'Anystate',
    //             pincode: 12345,
    //             defaultAddress: true,
    //         },
    //         {
    //             id: 2,
    //             street: '456 Oak St',
    //             area: 'Suburbia',
    //             city: 'Anytown',
    //             state: 'Anystate',
    //             pincode: 67890,
    //             defaultAddress: false,
    //         },
    //         {
    //             id: 3,
    //             street: '789 Pine St',
    //             area: 'Countryside',
    //             city: 'Anytown',
    //             state: 'Anystate',
    //             pincode: 10112,
    //             defaultAddress: false,
    //         },
    //     ],
    // };

    const getUserDetails = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('UserId');
        try {
            if (userId && jwtToken) {
                const response = await getUserById(userId, jwtToken);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data);
                    sessionStorage.setItem('User Details', JSON.stringify(data));
                    setUser(data);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const cachedUser = JSON.parse(sessionStorage.getItem('User Details'));
        console.log(cachedUser);
        if (cachedUser) {
            console.log(cachedUser);
            setUser(cachedUser);
        } else {
            getUserDetails();
        }
    }, []);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        console.log('selected address', address);
    };

    const handleAddressAdditions = () => {
        console.log('address-added');
        setIsAddingAddress(false);
        getUserDetails();
    }

    const handleAddNewAddress = () => {
        const addAddress = sessionStorage.getItem('add-address');
        if (addAddress) {
            sessionStorage.removeItem('add-address');
        }
        setIsAddingAddress(!isAddingAddress);
        if (!isAddingAddress) {
            // Scroll to the address form
            setTimeout(() => {
                document.getElementById('address-form').scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    };

    const handleNext = async () => {
        sessionStorage.setItem('selected address for payment', JSON.stringify(selectedAddress));
        console.log(selectedAddress);
        navigate('/payment');
    }

    return (
        <div>
            {
                user ? (
                    user.addressList.length === 0 ? (
                        <div>
                            <p>Please create an address now.</p>
                            <AddressForm />
                        </div>
                    ) : (
                        <div className='d-flex flex-column justify-content-center align-items-center my-4'>
                            <strong>Please choose the address below : </strong>
                            <ul class="list-group mx-3 my-3">
                                {user.addressList.map((eachAddress, index) => (
                                    <li class="list-group-item d-flex justify-content-start" key={index}>
                                        <input
                                            class="form-check-input me-3"
                                            type="radio"
                                            name="address"
                                            value={eachAddress.id}
                                            onChange={() => handleAddressSelect(eachAddress)}
                                            checked={selectedAddress === eachAddress}
                                        />
                                        <label style={{ marginLeft: '10px' }}>
                                            <strong>{eachAddress.street}, {eachAddress.area}, {eachAddress.city}, </strong>
                                            {eachAddress.state}, {eachAddress.pincode} {eachAddress.defaultAddress ? '(Default)' : ''}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <div className='d-flex justify-content-center'>
                                <Button
                                    className='mx-3'
                                    onClick={() => {
                                        // sessionStorage.setItem('add-address', true);
                                        // navigate("/settings");
                                        handleAddNewAddress()
                                    }}
                                    href="#address-form"
                                >
                                    {/* Add New Address */}
                                    {isAddingAddress ? 'Cancel' : 'Add New Address'}
                                </Button>
                                {
                                    selectedAddress ? <div>
                                        <Button className='mx-3' onClick={handleNext}>Next</Button>
                                    </div> : <button type="button" class="btn btn-secondary mx-3" disabled>Next</button>
                                }
                            </div>
                            {isAddingAddress && <div id='address-form'>
                                <AddressForm handleAddressAdditions={handleAddressAdditions} />
                            </div>}
                        </div>
                    )
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    );
}

export default AddressCheck;
