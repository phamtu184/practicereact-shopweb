import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider(props) {
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(2);
  const [cartItems, setCartItems] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  useEffect(() => {
    axios.get('/auth/islogin')
      .then(res => {
        if (res.data !== 'login:false') {
          setLogin(true);
          setUsername(res.data.username);
          setRole(res.data.role);
        }
      })
  }, []);

  const addToCart = (product) => {
    if (isLogin === true) {
      if (cartItems.some((e) => e._id === product._id)) {
        setOpenSnackbar(true);
        setInfoSnackbar('Sản phẩm này đã có trong giỏ hàng');
        setTypeSnackbar('warning');
      }
      else {
        setCartItems(
          cartItems.concat(product)
        )
        setOpenSnackbar(true);
        setInfoSnackbar('Thêm sản phẩm thành công');
        setTypeSnackbar('success');
      }
    }
    else {
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng đăng nhập để thực hiện thao tác');
      setTypeSnackbar('warning');
    }
  }
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        isLogin: isLogin,
        username: username,
        role: role,
        // snackbar
        openSnackbar: openSnackbar,
        infoSnackbar: infoSnackbar,
        typeSnackbar: typeSnackbar,
        closeSnackbar: closeSnackbar
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}