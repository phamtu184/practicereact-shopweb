import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ProductInfo from '../component/products/productInfo';

export default function ProductPage() {
  let { productId } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`/product/product/${productId}`)
      if (res.data !== 'GET_PRODUCT_ERROR') {
        setProduct(res.data);
      }
      else {
        window.history.back();
      }
    }
    getProduct()
  }, [productId])
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-9'>
          <ProductInfo product={product} />
        </div>
        <div className='col-md-3'>
          sadsad
        </div>
      </div>
    </div>

  )
}