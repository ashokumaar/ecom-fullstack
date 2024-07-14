import axios from "axios";

// const baseUrl = 'http://localhost:8000/'
// const baseUrl = 'http://localhost:8888' // api gatway
const baseUrl = process.env.REACT_APP_AUTH_SERVICE_API

// --------------------Auth related-----------------------
export const getWelcome = async () => {
    try {
        return await axios.get(`${baseUrl}/auth/welcome`)
    } catch (error) {
        console.log(error);
    }
}

export const checkUsernameExist = async (username) => {
    try {
        return await axios.get(`${baseUrl}/auth/checkUsernameExist/${username}`)
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/auth/register`, payload)
    } catch (error) {
        console.log(error);
    }
}

export const registerSeller = async (payload, token) => {
    try {
        return await axios.post(`${baseUrl}/auth/registerForSeller`, payload, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.log(error);
    }
}

export const generateToken = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/auth/generateToken`, payload)
    } catch (error) {
        console.log(error);
    }
}

// --------------------Auth related (User Specific)-----------------------
export const userProfile = async (token) => {
    try {
        return await axios.get(`${baseUrl}/auth/user`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const userDetails = async (token) => {
    try {
        return await axios.get(`${baseUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin = async (token) => {
    try {
        return await axios.get(`${baseUrl}/auth/admin/isAdmin`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

// -----------------User/Address related--------------getUserById
export const getUserById = async (id, token) => {
    try {
        return await axios.get(`${baseUrl}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (id, payload, token) => {
    try {
        return await axios.put(`${baseUrl}/users/update/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const addAddress = async (payload, userId, token) => {
    try {
        return await axios.post(`${baseUrl}/users/addAddress/userId/${userId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const defaultAddress = async (payload, userId, token) => {
    try {
        return await axios.put(`${baseUrl}/users/defaultAddress/userId/${userId}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async (id, token) => {
    try {
        return await axios.delete(`${baseUrl}/users/deleteAddress/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

// -----------------Cart related--------------
export const getCartByUserId = async (id, token) => {
    try {
        return await axios.get(`${baseUrl}/carts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const createCart = async (payload, token) => {
    try {
        return await axios.post(`${baseUrl}/carts/create`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const addItemToCart = async (cartId, payload, token) => {
    try {
        return await axios.post(`${baseUrl}/carts/${cartId}/item`, payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCartItemQuantity = async (cartId, itemId, quantity, token) => {
    try {
        return await axios.put(`${baseUrl}/carts/${cartId}/items/${itemId}`, quantity,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
    } catch (error) {
        console.log(error);
    }
}

export const removeItem = async (itemId, token) => {
    try {
        return await axios.delete(`${baseUrl}/carts/deleteCartItemById/${itemId}`, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.log(error);
    }
}

// -----------------Orders related--------------

export const createOrder = async (payload, token) => {
    try {
        return await axios.post(`${baseUrl}/orders/create`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersByUserId = async (id, token) => {
    try {
        return await axios.get(`${baseUrl}/orders/getOrders/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.log(error);
    }
}
