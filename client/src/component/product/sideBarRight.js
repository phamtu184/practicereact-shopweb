import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { ProductContext } from '../products/productContext';
import { Link } from 'react-router-dom';

export default function SideBarRight() {
  const { productsTemp } = useContext(ProductContext);
  const productsTop = productsTemp.sort((a, b) => b.viewCounts - a.viewCounts).slice(0, 4);
  return (
    <Paper className='search-bar-paper'>
      <div className='mb-2'>
        <h5>Sản phẩm hàng đầu</h5>
        {productsTop.map((item, index) => (
          <div key={index} className='product-top mb-2 table-custom'>
            <div className='product-thumb'>
              <Link to={'/product/' + item._id}>
                <img src={item.images[0]} style={{ width: '100px' }} alt={item.name} />
              </Link>
            </div>
            <div className='product-info'>
              <h3 className='title18 text-uppercase product-title dosis-font font-bold'>{item.name}</h3>
            </div>
          </div>
        ))

        }
      </div>
    </Paper>
  )
}