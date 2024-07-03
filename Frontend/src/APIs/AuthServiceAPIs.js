import axios from "axios";

// const baseUrl = 'http://localhost:8000/'
const baseUrl = 'http://localhost:8888' // api gatway

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

export const generateToken = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/auth/generateToken`, payload)
    } catch (error) {
        console.log(error);
    }
}

export const userProfile = async (token) => {
    try {
        return await axios.get(`${baseUrl}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
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
// /{cartId}/items/{itemId}
// -----------------Orders related--------------

// -----------------User related----------------
