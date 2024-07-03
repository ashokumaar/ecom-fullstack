import React, { useEffect, useState } from 'react';
import { getWelcome } from '../APIs/AuthServiceAPIs';

const Welcome = () => {
    const [welcome, setWelcome] = useState('')

    useEffect(()=>{
        getWelcomePage();
    },[])

    const getWelcomePage = async () => {
       let response = await getWelcome()
       setWelcome(response.data)
        console.log(response.data);
    }
    
    return (
        <div className='container'>
            <h4>{welcome}</h4>
        </div>
    );
}

export default Welcome;
