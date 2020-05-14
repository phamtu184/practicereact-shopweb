import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import url from "../config/url";

export const CartContext = createContext();

export function CartProvider(props) {
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    username: "",
    role: 2,
    isAuthenticated: false,
    id: "",
    email: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("");
  const [isPutData, setIsPutData] = useState(false);
  const [isDrawer, setDrawer] = useState(false);

  useEffect(() => {
    if (localStorage.authToken) {
      axios
        .post(`${url.LOCAL}/auth/islogin`, {
          authToken: localStorage.authToken,
        })
        .then((res) => {
          if (res.status === 200) {
            setUserInfo({
              isLogin: true,
              username: res.data.auth.username,
              role: res.data.auth.role,
              id: res.data.auth.id,
              isAuthenticated: res.data.auth.isAuthenticated,
              email: res.data.auth.email,
            });
            if (res.data.cart) {
              setCartItems(res.data.cart.map((e) => ({ ...e, quantity: 1 })));
            }
          }
        });
    }
  }, []);
  useEffect(() => {
    if (isPutData) {
      const rs = cartItems.map((item) => item._id);
      axios
        .put(`${url.LOCAL}/user/cart`, { userId: userInfo.id, cart: rs })
        .then(setIsPutData(false))
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const addToCart = (product) => {
    if (userInfo.isLogin === true) {
      if (cartItems.some((e) => e._id === product._id)) {
        setOpenSnackbar(true);
        setInfoSnackbar("Sản phẩm này đã có trong giỏ hàng");
        setTypeSnackbar("warning");
      } else {
        const getProducts = async () => {
          setCartItems(
            cartItems.concat(product).map((e) => ({ ...e, quantity: 1 }))
          );
          setOpenSnackbar(true);
          setInfoSnackbar("Thêm sản phẩm thành công");
          setTypeSnackbar("success");
          setIsPutData(true);
        };
        getProducts();
      }
    } else {
      setOpenSnackbar(true);
      setInfoSnackbar("Vui lòng đăng nhập để thực hiện thao tác");
      setTypeSnackbar("warning");
    }
  };
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const deleteCart = async (cart) => {
    const index = cartItems.indexOf(cart);
    setIsPutData(true);
    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
  };
  const increQty = (item) => {
    const rs = cartItems.map((element, index) => {
      if (element._id === item._id && item.quantity < 10) {
        cartItems[index].quantity = item.quantity + 1;
      }
      return element;
    });
    setCartItems(rs);
  };
  const decreQty = (item) => {
    const rs = cartItems.map((element, index) => {
      if (element._id === item._id && item.quantity > 1) {
        cartItems[index].quantity = item.quantity - 1;
      }
      return element;
    });
    setCartItems(rs);
  };
  const checkOutCart = () => {
    if (!userInfo.isAuthenticated) {
      setOpenSnackbar(true);
      setInfoSnackbar("Vui lòng kích hoạt tài khoản để thanh toán!");
      setTypeSnackbar("warning");
    } else {
      setOpenSnackbar(true);
      setInfoSnackbar("Thanh toán thành công!");
      setTypeSnackbar("success");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        userInfo,
        setUserInfo,
        setCartItems,
        deleteCart,
        increQty,
        decreQty,
        checkOutCart,
        // snackbar
        openSnackbar,
        infoSnackbar,
        typeSnackbar,
        closeSnackbar,
        // drawler
        isDrawer,
        setDrawer,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
