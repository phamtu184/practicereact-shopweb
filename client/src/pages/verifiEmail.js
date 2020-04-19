import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    axios.get('/auth/islogin')
      .then(res => {
        if (res.data !== 'login:false') {
          setEmail(res.data.email);
        }
      })
  }, []);
  return (
    <>
      <div className='container' style={{ marginTop: '50px' }}>
        <h2>Kích hoạt tài khoản</h2>
        <p>Đã gửi mã kích hoạt vào Email: <b>{email}</b> </p>
        <p>Để kích hoạt tài khoản vui lòng truy cập vào Email: <b>{email}</b> </p>
      </div>
      <div style={{ height: '500px' }}></div>
    </>
  )
}