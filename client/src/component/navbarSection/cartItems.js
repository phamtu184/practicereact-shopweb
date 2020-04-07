import React, { useState, useEffect } from 'react';

import CartIcon from '../../image/svglogo/supermarket.svg';
import BinIcon from '../../image/svglogo/bin.svg';
import { IconButton, Badge, Popover, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

export default function CartItems(props) {
  const { cartItems, deleteCart } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    if (cartItems.length) {
      const rs = cartItems.reduce((a, b) => ((a + b.price) * b.quantity), 0)
      setTotalPrice(rs)
    }
    else {
      setTotalPrice(0)
    }
  }, [cartItems])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;
  return (
    <>
      <IconButton edge="start" color="inherit" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={cartItems.length} color="primary">
          <img src={CartIcon} alt='cart icon' />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {cartItems.length
          ? <>
            {cartItems.map((cart, index) => (
              <div key={index} className='item-cart'>
                <div className='product-thumb'>
                  <img src={cart.images[0]} style={{ width: '90px' }} alt={cart.name} />
                </div>
                <div className='product-info pl-2 pr-2'>
                  <h3 className='product-title'>{cart.name}</h3>
                  <div className='mini-cart-qty'>
                    <span>
                      <span>{cart.quantity} x </span>
                      <span className='color600'>£{cart.price}</span>
                    </span>
                  </div>
                </div>
                <div className='product-delete text-right pl-2 pr-2'>
                  <IconButton onClick={() => deleteCart(cart)}>
                    <img src={BinIcon} style={{ width: '14px' }} alt='BinIcon' />
                  </IconButton>
                </div>
              </div>
            ))}
          </>
          : null}
        <div className='total-price' style={{ width: '220px' }}>
          <span className='ml-2 text-uppercase title18'>tổng</span>
          <span className='mr-2 color600 title18 font-weight-bold'>£{totalPrice}</span>
        </div>
        <div className='check-cart'>
          <Link to='/cart'>
            <Button onClick={handleClose}>
              Xem giỏ hàng
            </Button>
          </Link>
        </div>
      </Popover>
    </>
  )
}