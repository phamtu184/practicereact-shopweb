import React, { useContext } from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ProductContext } from '../products/productContext';
import { Link } from 'react-router-dom';

const DivSearchBar = styled.div`
.search-bar-paper{
  .product-thumb{
    width: 90px;
    border: 1px solid #e5e5e5;
  }
  .product-info{
    padding: 0px 0 0 20px;
    vertical-align: middle;
    h3{
      overflow: inherit;
      text-overflow: inherit;
      white-space: normal;
      font-weight: normal;
      margin: 0 0 7px;
      font-family: 'Dosis', sans-serif;
      font-size: 18px;
      text-transform: uppercase;
    }
    .product-price{
      font-weight: 700;
      font-size: 18px;
      font-family: dosis;
      color: $blue-600;
    }
    .product-rating{
      width: 200;
      display: flex;
      align-items: flex-start;
      label{
        display: block;
      }
    }
  }
}
`
export default function SideBarRight() {
  const { productsTemp } = useContext(ProductContext);
  const productsTop = productsTemp.sort((a, b) => b.viewCounts - a.viewCounts).slice(0, 4);
  return (
    <DivSearchBar>
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
                <h3>{item.name}</h3>
                <div className='product-rating'>
                  <Rating
                    name="read-only"
                    value={item.comment.items.reduce((total, next) => total + next.star, 0) / item.comment.total}
                    readOnly size='small'
                    precision={0.5}
                  />
                </div>
                <div className='product-price'>
                  <span>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </Paper>
    </DivSearchBar>
  )
}