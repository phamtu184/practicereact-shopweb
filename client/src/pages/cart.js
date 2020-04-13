import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/cart';
import TableProduct from '../component/cart/tableProducts';
import CartCollaterals from '../component/cart/cartCollaterals';
import SnackBar from '../component/snackBar/snackBar';

const DivPaySection = styled.div`
.table-cart{
  padding: 0;
  border-collapse: collapse;
  border: 1px solid rgba(0,0,0,.1);
  margin: 0 -1px 24px 0;
  text-align: left;
  width: 100%;
  border-radius: 5px;
  text-transform: capitalize;
  color: #555;
  a{
    text-decoration: none;
    color: #555;
  }
  a:hover{
    color: $blue-600;
    transition: 0.4s;
  }
  .product-remove{
    max-width: 30px;
  }
  th{
    vertical-align: middle;
    font-weight: 700;
    padding: 9px 12px;
    line-height: 1.5em;
  }
  td{
    padding: 9px 12px;
    vertical-align: middle;
    line-height: 1.5em;
  }
  .product-thumbnail{
    max-width: 54px;
    text-align: center;
    min-width: 30px;
    img{
      width: 70px;
    }
  }
  .coupon{
    display: flex;
    align-items: center;
    button{
      color: white;
      background-color: #333;
      vertical-align: baseline
    }
    button:hover{
      background-color: $blue-700;
    }
  }
  .detail-qty{
    border-radius: 4px;
    height: 40px;
    width: 80px;
    position: relative;
    border: 1px solid #e5e5e5;
    .qty-down{
      bottom: 0
    }
    .qty-up{
      top: 0
    }
    button{
      position: absolute;
      width: 30px;
      height: 20px;
      display: block;
      text-align: center;
      line-height: 20px;
      right: 0;
      border-top:none;
      border-bottom:none;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      background-color: white;
    }
    .cart-item-quantity{
      position: absolute;
      left: 40%;
      top: 50%;
      transform: translate(-40%, -50%);
    }
  }
}
table, th, td{
  border: 1px solid #e5e5e5;
}
.cart-collaterals{
  width: 100%;
  .cart_totals{
    width: 50%;
  }
  button{
    color: white;
    background-color: #333;
    vertical-align: baseline
  }
  button:hover{
    background-color: $blue-700;
  }
}
`
export default function Cart() {
  const { cartItems, deleteCart, decreQty, increQty, checkOutCart,
    openSnackbar, closeSnackbar, typeSnackbar, infoSnackbar } = useContext(CartContext);

  return (
    <>
      <DivPaySection className='container mt-4'>
        <h2 className='mb-2'>CART</h2>
        <TableProduct cartItems={cartItems} deleteCart={deleteCart}
          decreQty={decreQty} increQty={increQty} />
        <CartCollaterals cartItems={cartItems} checkOutCart={checkOutCart} />
      </DivPaySection>
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