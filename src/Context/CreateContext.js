import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react'
import axios from '../utility/axiosPathFiles/axios';
const CreateCtx = createContext();

export default function CreateContext({children}) {


    const [cartCounts, setCartCount] = useState(0);
    const [productId, setProductId] = useState(null);

            const IncreaseCount = async (productId, qty) => {
                const finalQty = Number(qty);
                const response = await axios.post(
                    '/add-to-cart',
                    { productId, qty: finalQty },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
                );

                if (response.status === 200 && response.data.success) {
                    setCartCount(response.data.totalCartItems);                
                }
            };


            const fetchCartCount = async () => {
            try {
            const response = await axios.get('/get-cart-count', {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            if(response.data.success)
            {
                setCartCount(response.data.totalCartItems);
            }
            } catch (err) {
            setCartCount(0);
            }
            };

            useEffect(() => {
            const token = localStorage.getItem('accessToken');
            if(token) fetchCartCount();
            }, []); // no dependency on token

    //Cart Count Cannot be Empty.
    const DecreaseCount  = () =>{
        setCartCount(prev => (prev>0 ? prev-1 : 0));
    }

    const valuesArray = {
        cartCounts,
        IncreaseCount,
        DecreaseCount,
        fetchCartCount 
    };


  return (
  <CreateCtx.Provider value={valuesArray}>{children}</CreateCtx.Provider>
  );
}

export function useCount()
{
    return useContext(CreateCtx);
}
