import React, { useState } from 'react';

import { TextField, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '../../image/svglogo/stop.svg'
export default function TableProducts(props) {
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
        {props.cartItems.map((item, index) => (
          <tr key={index}>
            <td className='product-thumbnail'><img src={item.images[0]} alt={item.name} /></td>
            <td>{item.name}</td>
            <td className='product-price'>£{item.price}</td>
            <td>1</td>
            <td>£{item.price}</td>
            <td className='product-remove'>
              <IconButton onClick={() => props.deleteCart(item)}>
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