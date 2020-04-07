import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ProductProvider } from '../component/products/productContext';
import ProductInfo from '../component/products/productInfo';
import CarouselCus from '../component/carousel/CarouselCus';
import SideBarRight from '../component/product/sideBarRight';

import Background1 from '../image/background/slide1.jpg';
import Background2 from '../image/background/slide2.jpg';
import Background3 from '../image/background/slide3.jpg';
const items = [
  {
    src: Background1,
    altText: 'Slide 1',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background2,
    altText: 'Slide 2',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background3,
    altText: 'Slide 3',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  }
];
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
    <ProductProvider>
      <CarouselCus items={items} animatedClass='animated rollIn' />
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-9'>
            <ProductInfo product={product} />
          </div>
          <div className='col-md-3'>
            <SideBarRight />
          </div>
        </div>
      </div>
    </ProductProvider>
  )
}