import React, { useState } from 'react';

import { InputLabel, FormControl, Select } from '@material-ui/core';

export default function SortTopBar(){
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(12);

  const onChangeSort = (event)=> {
    setSort(event.target.value);
  }
  const onChangePage = (event)=> {
    setPage(event.target.value);
  }
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
        >
          <option value={12}>12</option>
          <option value={18}>18</option>
          <option value={24}>24</option>
        </Select >
      </FormControl>
    </div>
  )
}