import React, { useContext } from 'react';

import { CartContext } from '../context/cart';
import TableProduct from '../component/cart/tableProducts';
import CartCollaterals from '../component/cart/cartCollaterals';

export default function Cart() {
  const { cartItems, deleteCart } = useContext(CartContext);
  return (
    <div className='container pay-section mt-4'>
      <h2 className='mb-2'>CART</h2>
      <TableProduct cartItems={cartItems} deleteCart={deleteCart} />
      <CartCollaterals cartItems={cartItems} />
    </div>
  )
}