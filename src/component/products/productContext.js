import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export function ProductProvider(props){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    axios.get('/product/product')
    .then((res)=>{
      setProducts(res.data);
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return(
    <ProductContext.Provider
      value={{
        products: products,
        loading: loading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}