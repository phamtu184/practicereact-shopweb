import React, { useState } from 'react';

import CartIcon from '../../image/svglogo/supermarket.svg';
import BinIcon from '../../image/svglogo/bin.svg';
import { IconButton, Badge, Popover } from '@material-ui/core';

export default function CartItems(props) {
  const { cartItems } = props;
  const [anchorEl, setAnchorEl] = useState(null);
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
                <div className='product-info'>
                  <h3 className='product-title'>{cart.name}</h3>
                  <div className='mini-cart-qty'>
                    <span><span>1 x </span><span className='color600'>{cart.price}£</span></span>
                  </div>
                </div>
                <div className='product-delete text-right'>
                  <IconButton>
                    <img src={BinIcon} style={{ width: '14px' }} alt='BinIcon' />
                  </IconButton>
                </div>
              </div>
            ))}
            <div>
              <span>toltal</span>

            </div>
          </>
          : <p>null</p>}

      </Popover>
    </>
  )
}