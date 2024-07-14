import axios from "axios";

const baseUrl = process.env.REACT_APP_ELECTRONICS_SERVICE_API

export const getAllProducts2 = async () => {
    try {
        return await axios.get(`${baseUrl}/all`)
    } catch (error) {
        console.log(error);
    }
}

export const getProductById2 = async (id, token) => {
    try {
        return await axios.get(`${baseUrl}/${id}`, {headers:{Authorization:`Bearer ${token}`}} )
    } catch (error) {
        console.log(error)
    }
}

export const createProduct2 = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/create`, payload)
    } catch (error) {
        console.log(error);
    }
}

export const createProducts2 = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/createmany`, payload)
    } catch (error) {
        console.log(error);
    }
}

