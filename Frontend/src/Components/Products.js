import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../APIs/ProductsApi';

const Products = () => {

    // const initialProduct = {
    //     id:0, image:'', name:'', discription:'', stock:0, priceIn:0, priceOut:0, isActive:false
    // }

    const [products, setProducts] = useState([])

    useEffect(() => {
        getListOfProductss();
    },[])
    
    const getListOfProductss = async () => {
        const productList = await getAllProducts();
        console.log('getListOfProducts2()', productList.data)
        setProducts(...products, productList.data);
    }

    return (
        <>

            {
                products.map((eachProduct) => {
                    const { id, name, image, description, priceIn, priceOut } = eachProduct
                    return <div key={id}>
                        <img src={image} alt='Product_image'/>
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <span style={{color:'green'}}>{priceIn}</span> &nbsp;
                        <span style={{color:'black', textDecoration: 'line-through'}}>{priceOut}</span>
                    </div>
                })
            }
            <button onClick={getListOfProductss}>Get all Products</button><br/>
            <button>create product</button>

        </>
    );
}

export default Products;
