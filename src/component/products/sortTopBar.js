import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, Select, Input } from '@material-ui/core';

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

export default function SortTopBar(){
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(12);

  const onChangeSort = (event)=> {
    setSort(event.target.value);
  }
  const onChangePage = (event)=> {
    setPage(event.target.value);
  }
  const inputClasses = useInputStyles();
  return(
    <div className='search-top-bar'>
      <h2 className='mr-auto'>Shop</h2>
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
          <option value='popular'>Theo độ phổ biến</option>
          <option value='price lower'>Theo giá từ cao tới thấp</option>
          <option value='price higher'>Theo giá từ thấp tới cao</option>
        </Select >
      </FormControl>

      <FormControl size='small' className='ml-4'>
        <InputLabel >
          Trang
        </InputLabel>
        <Select 
        native
          value={page}
          onChange={onChangePage}
          autoWidth={true}
          input={<Input classes={inputClasses} />}
        >
          <option value={12}>12</option>
          <option value={18}>18</option>
          <option value={24}>24</option>
        </Select >
      </FormControl>
    </div>
  )
}