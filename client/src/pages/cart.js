import React, { useContext } from 'react';

import { CartContext } from '../context/cart';
import TableProduct from '../component/cart/tableProducts';
import CartCollaterals from '../component/cart/cartCollaterals';
import SnackBar from '../component/snackBar/snackBar';

export default function Cart() {
  const { cartItems, deleteCart, decreQty, increQty, checkOutCart,
    openSnackbar, closeSnackbar, typeSnackbar, infoSnackbar } = useContext(CartContext);

  return (
    <>
      <div className='container pay-section mt-4'>
        <h2 className='mb-2'>CART</h2>
        <TableProduct cartItems={cartItems} deleteCart={deleteCart}
          decreQty={decreQty} increQty={increQty} />
        <CartCollaterals cartItems={cartItems} checkOutCart={checkOutCart} />
      </div>
      <SnackBar
        openSnackbar={openSnackbar}
        closeSnackbar={closeSnackbar}
        vertical='top'
        horizontal='right'
        typeSnackbar={typeSnackbar}
        infoSnackbar={infoSnackbar}
      />
    </>
  )
}