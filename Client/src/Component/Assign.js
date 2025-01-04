
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Assign() {
    const [apidata, setData] = useState([]); 

    
    const handleClick = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setData(response.data); 
        } catch (error) {
            console.log('Error in fetching data', error);
        }
    };

  
    const removeProduct = (id) => {
        setData(apidata.filter(product => product.id !== id));
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {apidata.map((product) => (
                <div
                    key={product.id}
                    className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-all"
                >
                    <img
                        src={product?.image}
                        alt={product.title}
                        className="w-40 h-40 object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold text-center text-gray-800">{product?.title}</h3>
                    <p className="text-sm text-gray-600">{product?.category}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">${product?.price}</p>
                    {/* <p>{product?.rating?.rate}</p> */}
                    <button
                        onClick={() => removeProduct(product.id)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className=' border border-red-600 px-4 py-2   font-semibold rounded-lg  hover: shadow-lg'>
              <button className=' border border-r-red-600 px-4 py-2 text-black  font-semibold rounded-lg  hover: shadow-lg'>add button</button>
            </div>
        </div>

    );
}

export default Assign;
