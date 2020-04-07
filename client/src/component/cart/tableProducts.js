import React, { useState } from 'react';

import { TextField, Button, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteIcon from '../../image/svglogo/stop.svg'
import DownIcon from '../../image/svglogo/down-arrow.svg'
import UpIcon from '../../image/svglogo/up-arrow.svg'
export default function TableProducts(props) {
  const { cartItems, deleteCart, increQty, decreQty } = props;
  const [coupon, setCoupon] = useState('');

  const handleChangeCoupon = (e) => {
    setCoupon(e.target.value)
  }

  return (
    <table className='table-cart'>
      <thead>
        <tr>
          <th></th>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td className='product-thumbnail'>
              <Link to={'/product/' + item._id}>
                <img src={item.images[0]} alt={item.name} />
              </Link>
            </td>
            <td>
              <Link to={'/product/' + item._id}>{item.name}</Link>
            </td>
            <td className='product-price'>£{item.price}</td>
            <td>
              <div className='detail-qty'>
                <button className='qty-down' onClick={() => decreQty(item)}>
                  <img src={DownIcon} style={{ width: '7px' }} alt='downIcon' />
                </button>
                <span className='cart-item-quantity'>{item.quantity}</span>
                <button className='qty-up' onClick={() => increQty(item)}>
                  <img src={UpIcon} style={{ width: '7px' }} alt='upIcon' />
                </button>
              </div>
            </td>
            <td>£{item.price * item.quantity}</td>
            <td className='product-remove'>
              <IconButton onClick={() => deleteCart(item)}>
                <img src={DeleteIcon} style={{ width: '16px' }} alt='DeleteIcon' />
              </IconButton>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan='6'>
            <div className='coupon'>
              <TextField
                label="Mã giảm giá"
                variant="filled"
                size='small'
                value={coupon}
                onChange={handleChangeCoupon}
              />
              <Button className='ml-2'>Nhập</Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}