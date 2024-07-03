import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const HelloWorld = () => {
    const messageArray = ['vellu babu, velli AC veskoni paduko', 'emi ra balaraju ni valla vupayogam', 'nuvvu holloworld daggare vunnava ra','Japan vallu evevo kanipeduthunte nuvvu idi kanipettav','big data, mission learning, block chain, artifial intelligence, digital maufacturing, big data analysis, quantum communication, internet of things'];
    const positionArray = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center' ]
    useEffect(() => {
        const fun = async () => {
            for (let i = 0; i <= 500; i++) {
                const randomIndex = Math.floor(Math.random() * messageArray.length);
                const randomValue = messageArray[randomIndex];
                const positionIndex = Math.floor(Math.random() * positionArray.length);
                const position = positionArray[positionIndex];
                toast(randomValue, {
                    position: position,
                    autoClose: 10000
                });
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        fun();
    }, [])
    return (
        <div className='container'>
            {/* <iframe title='helloworld' src="https://drive.google.com/file/d/1WweluEY4K0AzE65pBfDkGLizbTEzCD0r/preview" width="100%" height="500px" ></iframe> */}
            magic
        </div>
    );
}

export default HelloWorld;
