import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

export default function TableProducts(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems } = props;
  useEffect(() => {
    if (cartItems.length) {
      const rs = cartItems.reduce((a, b) => ((a + b.price) * b.quantity), 0)
      setTotalPrice(rs)
    }
    else {
      setTotalPrice(0)
    }
  }, [cartItems])
  const pricePay = totalPrice - 0
  return (
    <div className='cart-collaterals'>
      <div className='cart_totals'>
        <h2>Thanh toán</h2>
        <table cellSpacing="0" className='table-cart'>
          <tbody>
            <tr>
              <th>Tổng tiền hàng</th>
              <td>£{totalPrice}</td>
            </tr>
            <tr>
              <th>Giảm giá</th>
              <td>£0</td>
            </tr>
            <tr>
              <th>Tổng tiền thanh toán</th>
              <td className='font-weight-bold'>£{pricePay}</td>
            </tr>
          </tbody>
        </table>
        <Button>Thanh toán</Button>
      </div>
    </div>
  )
}