import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, Select, Input } from '@material-ui/core';

import { ProductContext } from './productContext';

const useInputStyles = makeStyles({
  underline: {
    "&:after": {
      // focused
      borderBottom: `2px solid #1565c0`
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `1px solid #1e88e5`
    }
  }
});

export default function SortTopBar() {
  const { postPerPage, setPostPerPage, sort, onChangeSort } = useContext(ProductContext);

  const onChangePage = (event) => {
    setPostPerPage(event.target.value);
  }
  const inputClasses = useInputStyles();
  return (
    <div className='search-top-bar ml-3'>
      <h2 className='mr-auto dois-font'>Shop</h2>
      <FormControl size='small'>
        <InputLabel >
          Sắp xếp
        </InputLabel>
        <Select
          native
          value={sort}
          onChange={onChangeSort}
          autoWidth={true}
          input={<Input classes={inputClasses} />}
        >
          <option value='popular'>Theo lượt xem</option>
          <option value='rating'>Theo đánh giá</option>
          <option value='price lower'>Theo giá từ cao đến thấp</option>
          <option value='price higher'>Theo giá từ thấp đến cao</option>
        </Select >
      </FormControl>

      <FormControl size='small' className='ml-4'>
        <InputLabel >
          Trang
        </InputLabel>
        <Select
          native
          value={postPerPage}
          onChange={onChangePage}
          autoWidth={true}
          input={<Input classes={inputClasses} />}
        >
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={18}>18</option>
        </Select >
      </FormControl>
    </div>
  )
}