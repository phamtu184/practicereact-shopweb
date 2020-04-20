import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import DescriptionProduct from './descriptionProduct';
import ReviewProduct from './reviewProduct';
import { CartContext } from '../../context/cart';
import SnackBar from '../snackBar/snackBar';
import axios from 'axios';

const DivDetailTab = styled.div`
  display: flex;
  display: -ms-flex;
  display: -webkit-flex;
  .detail-tab-title{
    min-width: 200px;
    .list-tag-detail{
      font-weight: 700;
      span{
        display: block;
        position: relative;
        padding: 12px 25px;
        border-bottom: 1px solid #e5e5e5;
        text-decoration: none;
        outline: none;
        color: #555;
      }
      span:hover{
        color: #2196f3;
        transition: 0.5s;
      }
      .a-active{
        border-right: none;
        border-left: 2px solid #1e88e5;
      }
    }
  }
  .detail-tab-content{
    padding: 30px;
    width: 100%;
    border: 1px solid #e5e5e5;
    .review-product{
      label{
        display: block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700
      }
    }
    .detail-tab-desc{
      p{
        color: #555;
      }
      ul{
        color: #999;
      }
      line-height: 24px;
      font-size: 14px;
    }
    img{
      height: auto;
      max-width: 100%;
      vertical-align: top;
    }
    .review-product{
      .product-rating{
        width: 200;
        display: flex;
        align-items: flex-start;
      }
      button{
        color: white;
        background-color: #2196f3;
      }
      .user-review{
        .avatar{
          float: left;
        }
        .comment-text{
          margin: 0 0 0 50px;
          border: 1px solid #e4e1e3;
          border-radius: 4px;
          padding: 1em 1em 0;
        }
      }
    }
  }
  @media (max-width: 900px){
    display: inline-block;
    width: 100%;
    .detail-tab-title{
      .a-active{
        border-left: 1px solid #e5e5e5 !importan;
        border-bottom: 2px solid #1e88e5;
        border-right: 1px solid #e5e5e5;
      }
      ul{
        border-top: 1px solid #e5e5e5;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        li{
          display: inline-block;
          border-left: 1px solid #e5e5e5;
          border-right: 1px solid #e5e5e5;
          span{
            border-bottom: none;
          }
        }
      }
    }
  }
`
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
    <DivDetailTab className='mt-4'>
      <div className='detail-tab-title'>
        <ul className='list-tag-detail list-none text-uppercase'>
          <li className={tabActive === 'description' ? 'a-active' : ''} style={{ borderTop: '1px solid #e5e5e5' }}>
            <span onClick={() => clickActive('description')}>Miêu tả</span>
          </li>
          <li className={tabActive === 'review' ? 'a-active' : ''}>
            <span onClick={() => clickActive('review')}>Đánh giá({quatityReviews})</span>
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
    </DivDetailTab>
  )
}