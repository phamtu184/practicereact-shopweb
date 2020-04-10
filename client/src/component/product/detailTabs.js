import React, { useState, useContext } from 'react';

import DescriptionProduct from './descriptionProduct';
import ReviewProduct from './reviewProduct';
import { CartContext } from '../../context/cart';
import SnackBar from '../snackBar/snackBar';
import axios from 'axios';

export default function DetailTab(props) {
  const { product, setIsSubmit, quatityReviews } = props;
  const [tabActive, setTabActive] = useState('description')
  const [reviewValue, setReviewValue] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  const { userInfo } = useContext(CartContext)
  const clickActive = (e) => {
    setTabActive(e)
  }
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleChangeReviewValue = (e) => {
    setReviewValue(e.target.value)
  }
  const submitReview = (star, content) => {
    if (userInfo.isLogin && userInfo.isAuthenticated) {
      if (content.length) {
        axios.put('/product/product',
          { star: star, content: content, productId: product._id, username: userInfo.username })
          .then((res) => {
            if (res.data === 'REVIEW_SUCCESS') {
              setIsSubmit(true);
              setOpenSnackbar(true);
              setInfoSnackbar('Đánh giá thành công!');
              setTypeSnackbar('success');
              setReviewValue('');
            }
            else {
              setOpenSnackbar(true);
              setInfoSnackbar('Đánh giá thất bại!');
              setTypeSnackbar('error');
            }
          })
      }
      else {
        setOpenSnackbar(true);
        setInfoSnackbar('Vui lòng nhập nội dung đánh giá!');
        setTypeSnackbar('warning');
      }
    }
    else {
      setOpenSnackbar(true);
      setInfoSnackbar('Đăng nhập và kích hoạt tài khoản để đánh giá sản phẩm!');
      setTypeSnackbar('warning');
    }
  }
  return (
    <div className='detail-tab mt-4'>
      <div className='detail-tab-title'>
        <ul className='list-tag-detail list-none text-uppercase'>
          <li className={tabActive === 'description' ? 'a-active' : ''} style={{ borderTop: '1px solid #e5e5e5' }}>
            <a href='#listdetail' onClick={() => clickActive('description')}>Miêu tả</a>
          </li>
          <li className={tabActive === 'review' ? 'a-active' : ''}>
            <a href='#listdetail' onClick={() => clickActive('review')}>Đánh giá({quatityReviews})</a>
          </li>
        </ul>
      </div>
      <div className='detail-tab-content'>
        {tabActive === 'description'
          ? <DescriptionProduct />
          : <ReviewProduct
            submitReview={submitReview}
            reviewValue={reviewValue}
            handleChangeReviewValue={handleChangeReviewValue}
            product={product}
          />
        }
      </div>
      <SnackBar
        openSnackbar={openSnackbar}
        infoSnackbar={infoSnackbar}
        typeSnackbar={typeSnackbar}
        closeSnackbar={closeSnackbar}
        vertical='top'
        horizontal='right'
      />
    </div>
  )
}