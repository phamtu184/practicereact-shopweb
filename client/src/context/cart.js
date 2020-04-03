import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider(props) {
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    username: '',
    role: 2,
    id: ''
  });
  const [cartItems, setCartItems] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  const [isPutData, setIsPutData] = useState(false);

  useEffect(() => {
    axios.get('/auth/islogin')
      .then(res => {
        if (res.data !== 'login:false') {
          setUserInfo({
            isLogin: true,
            username: res.data.username,
            role: res.data.role,
            id: res.data.id
          })
          axios.post('/user/cart', { userId: res.data.id })
            .then(carts => {
              setCartItems(carts.data)
            })
        }
      })
  }, []);
  useEffect(() => {
    if (isPutData) {
      const rs = cartItems.map(a => a._id)
      axios.put('/user/cart', { userId: userInfo.id, cart: rs })
        .then()
        .catch(e => console.log(e))
      setIsPutData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const addToCart = (product) => {
    if (userInfo.isLogin === true) {
      if (cartItems.some(e => e._id === product._id)) {
        setOpenSnackbar(true);
        setInfoSnackbar('Sản phẩm này đã có trong giỏ hàng');
        setTypeSnackbar('warning');
      }
      else {
        const getProducts = async () => {
          setCartItems(
            cartItems.concat(product)
          )
          setOpenSnackbar(true);
          setInfoSnackbar('Thêm sản phẩm thành công');
          setTypeSnackbar('success');
          setIsPutData(true)
        }
        getProducts()
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
  const deleteCart = async (cart) => {
    const index = cartItems.indexOf(cart);
    setIsPutData(true)
    setCartItems([
      ...cartItems.slice(0, index),
      ...cartItems.slice(index + 1)
    ])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        userInfo: userInfo,
        deleteCart: deleteCart,
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