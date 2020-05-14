import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import url from "../../config/url";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../../context/cart";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function VerifyEmail() {
  let { token } = useParams();
  const history = useHistory();
  const { setUserInfo, setCartItems } = useContext(CartContext);
  useEffect(() => {
    axios
      .post(`${url.LOCAL}/auth/activeemail`, { token: token })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("event", "ACTIVE_EMAIL");
          localStorage.setItem("authToken", res.data.token);
          setUserInfo({
            isLogin: true,
            username: res.data.user.username,
            role: res.data.user.role,
            id: res.data.user.id,
            isAuthenticated: res.data.user.isAuthenticated,
            email: res.data.user.email,
          });
          if (res.data.cart) {
            setCartItems(res.data.cart.map((e) => ({ ...e, quantity: 1 })));
          }
          history.push("/");
        } else {
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
