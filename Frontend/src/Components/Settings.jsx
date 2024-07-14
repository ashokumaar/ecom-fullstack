import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import AddressForm from './AddressForm';
import { getUserById, defaultAddress, updateUser } from '../APIs/AuthServiceAPIs';
import { useUserContext } from '../SpringSecurityComponents/UserContext';
import { toast } from 'react-toastify';

const UserSettings = () => {

    const { jwtToken } = useUserContext();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    // const [password, setPassword] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    useEffect(() => {
        const addAddress = sessionStorage.getItem('add-address');
        if (addAddress) {
            handleAddNewAddress();
        }
    }, [])

    useEffect(() => {
        checkCachedUser();
    }, []);

    const checkCachedUser = () => {
        const cachedUser = JSON.parse(sessionStorage.getItem('User Details'));
        console.log(cachedUser);
        if (cachedUser) {
            console.log(cachedUser);
            setUser(cachedUser);
            setUsername(cachedUser.username);
            setEmail(cachedUser.email);
            setPhone(cachedUser.phone);
            
        } else {
            getUserDetails();
        }
    }

    const getUserDetails = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const userId = localStorage.getItem('UserId');
        try {
            if (userId && jwtToken) {
                const response = await getUserById(userId, jwtToken);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data);
                    sessionStorage.removeItem('User Details');
                    sessionStorage.setItem('User Details', JSON.stringify(data));
                    setUser(data);
                    setUsername(data.username);
                    setEmail(data.email);
                    setPhone(data.phone);
                }
            } else {
                toast.error('please login to see your details', { autoClose: 3000 });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        const updatedUser = {
            ...user,
            email,
            phone,
            // username,
            // password
        };
        try {
            const storedToken = localStorage.getItem('jwtToken');
            const response = await updateUser(updatedUser.id, updatedUser, storedToken);
            if(response.status===200){
                setUser(updatedUser);
            }
        } catch (error) {
            console.log(error, 'something went wrong!');
        }
        setIsEditing(false);
    };

    const handleDefaultAddressChange = async (id) => {
        try {
            const response = await defaultAddress({ "id": id }, user.id, jwtToken);
            if (response.status === 200) {
                console.log('default address changed');
                getUserDetails();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddressAdditions = () => {
        // console.log('address-added');
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

    return (
        <>
            {user &&
                <Container className="mt-5">
                    <Row>
                        <Col md={6} className='pb-5'>
                            <h3>Profile Information</h3>
                            {isEditing ? (
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user.username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group> */}
                                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                                    <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
                                </Form>
                            ) : (
                                user &&
                                <>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={5} sm={4} md={5} style={{ textAlign: 'start' }}><strong>Username :</strong></Col>
                                                <Col style={{ textAlign: 'start', padding: 0 }}>{user.username}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={4} md={5} style={{ textAlign: 'start' }}><strong>Email :</strong></Col>
                                                <Col style={{ textAlign: 'start', padding: 0 }}>{user.email}</Col>
                                            </Row>
                                            <Row>
                                                <Col xs={5} sm={4} md={5} style={{ textAlign: 'start' }}><strong>Phone :</strong></Col>
                                                <Col style={{ textAlign: 'start', padding: 0 }}>{user.phone}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="primary" className='mt-2' onClick={() => setIsEditing(true)}>Edit</Button>
                                </>
                            )}
                        </Col>

                        <Col md={6} className='pb-4'>
                            <h3>Addresses</h3>
                            <ListGroup>
                                {user && user.addressList.map(address => (
                                    <ListGroup.Item
                                        key={address.id}
                                        className={address.defaultAddress ? 'bg-warning' : ''}
                                    >
                                        <Row>
                                            <Col xs={8}>
                                                <div>
                                                    <strong>{address.street}, {address.area}, {address.city}</strong>
                                                </div>
                                                <div>
                                                    {address.state}, {address.pincode} {address.defaultAddress ? '(Default)' : ''}
                                                </div>
                                            </Col>
                                            <Col xs={4} className="text-end">
                                                <Button
                                                    variant={address.defaultAddress ? 'success' : 'outline-success'}
                                                    onClick={() => handleDefaultAddressChange(address.id)}
                                                    className="w-100"
                                                >
                                                    {address.defaultAddress ? 'Default' : 'Set as Default'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button
                                variant="primary"
                                className="mt-3"
                                onClick={handleAddNewAddress}
                                href="#address-form"
                            >
                                {isAddingAddress ? 'Cancel' : 'Add New Address'}
                            </Button>
                            {isAddingAddress && <div id="address-form"><AddressForm handleAddressAdditions={handleAddressAdditions} /></div>}
                        </Col>
                    </Row>
                </Container>
            }
        </>

    );
};

export default UserSettings;
