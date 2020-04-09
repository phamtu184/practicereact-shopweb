import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
        color: 'black'
      },
      '&:hover fieldset': {
        borderColor: '#40c4ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4285F4',
      },
    },
  },
})(TextField);

export default function ReviewProduct(props) {
  const [value, setValue] = useState(0);
  const [reviewValue, setReviewValue] = useState('');
  const { userInfo } = props;
  const handleChangeReviewValue = (e) => {
    setReviewValue(e.target.value)
  }
  return (
    <>
      {userInfo.isAuthenticated
        ? <div className='review-product'>
          <div className=''>
            <label>Đánh giá của bạn</label>
            <Rating
              name="size-small"
              defaultValue={value}
              size="small"
              onChange={(event, newValue) => { setValue(newValue); }}
              className='mb-4'
            />
            <CssTextField
              label="Đánh giá"
              multiline
              rows="4"
              fullWidth
              variant="outlined"
              value={reviewValue}
              onChange={handleChangeReviewValue}
            />
          </div>
        </div>
        : <div>vui long dang nhap</div>}
    </>
  )
}