import React, { useState, useContext } from 'react';

import DescriptionProduct from './descriptionProduct';
import ReviewProduct from './reviewProduct';
import { CartContext } from '../../context/cart';

export default function DetailTab() {
  const [tabActive, setTabActive] = useState('description')
  const { userInfo } = useContext(CartContext)
  const clickActive = (e) => {
    setTabActive(e)
  }
  return (
    <div className='detail-tab mt-4'>
      <div className='detail-tab-title'>
        <ul className='list-tag-detail list-none text-uppercase'>
          <li className={tabActive === 'description' ? 'a-active' : ''} style={{ borderTop: '1px solid #e5e5e5' }}>
            <a href='#listdetail' onClick={() => clickActive('description')}>Miêu tả</a>
          </li>
          <li className={tabActive === 'review' ? 'a-active' : ''}>
            <a href='#listdetail' onClick={() => clickActive('review')}>Đánh giá</a>
          </li>
        </ul>
      </div>
      <div className='detail-tab-content'>
        {tabActive === 'description'
          ? <DescriptionProduct />
          : <ReviewProduct userInfo={userInfo} />
        }
      </div>
    </div>
  )
}