import axios from "axios";

// const baseUrl = 'http://localhost:8100/fashion/products'
// const baseUrl = 'http://localhost:8888/fashion/products' // api gateway
const baseUrl = process.env.REACT_APP_FASHION_SERVICE_API

export const getAllProducts3 = async () => {
    try {
        return await axios.get(`${baseUrl}/all`)
    } catch (error) {
        console.log(error);
    }
}

export const getProductById3 = async (id, token) => {
    try {
        return await axios.get(`${baseUrl}/${id}`, {headers:{Authorization:`Bearer ${token}`}} )
    } catch (error) {
        console.log(error)
    }
}

export const createProduct3 = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/create`, payload)
    } catch (error) {
        console.log(error);
    }
}

export const createProducts3 = async (payload) => {
    try {
        return await axios.post(`${baseUrl}/createmany`, payload)
    } catch (error) {
        console.log(error);
    }
}

