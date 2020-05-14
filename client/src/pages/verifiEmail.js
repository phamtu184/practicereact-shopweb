import React, { useState, useContext } from "react";
import axios from "axios";
import url from "../config/url";
import { Button } from "@material-ui/core";
import CheckCircleIcon from "../image/jslogo/CheckCircle";
import { CartContext } from "../context/cart";

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(CartContext);
  const resendMail = () => {
    if (localStorage.authToken) {
      setIsLoading(true);
      axios
        .post(`${url.LOCAL}/auth/confirmemail`, {
          authToken: localStorage.authToken,
        })
        .then();
    }
  };
  return (
    <>
      <div className="container" style={{ marginTop: "50px" }}>
        <h2>Kích hoạt tài khoản</h2>
        <p>
          Đã gửi mã kích hoạt vào Email: <b>{userInfo.email}</b>{" "}
        </p>
        <p>Thanh toán sản phẩm chỉ áp dụng khi tài khoản đã được kích hoạt.</p>
        <p>
          Để kích hoạt tài khoản vui lòng truy cập vào Email:{" "}
          <b>{userInfo.email}</b>{" "}
        </p>
        <p>
          Mã kích hoạt có thời hạn là 24h, nếu không nhận được mã vui lòng gửi
          lại.
        </p>
        <Button
          onClick={resendMail}
          style={{ color: "white", backgroundColor: "#1e88e5" }}
          disabled={isLoading}
        >
          {isLoading && <CheckCircleIcon style={{ fontSize: "16px" }} />}
          {isLoading ? "Đã gửi" : "Gửi lại"}
        </Button>
      </div>
      <div style={{ height: "500px" }}></div>
    </>
  );
}
