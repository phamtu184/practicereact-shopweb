import React, { useState } from 'react';

import { SwipeableDrawer, useMediaQuery, IconButton, Paper } from '@material-ui/core';
import MenuIcon from '../../image/svglogo/menu.svg';

import { SearchCheckSize, SearchCheckBreed, SearchCheckPrice } from './searchCheck';

export default function SearchBar() {
  const [drawer, setDrawer] = useState(false);
  const clickOpenDrawer = () => {
    setDrawer(true);
  }
  const clickCloseDrawer = () => {
    setDrawer(false);
  }

  const matches = useMediaQuery('(max-width:992px)');
  return (
    <>
      {matches
        ? <>
          <IconButton onClick={clickOpenDrawer}>
            <img src={MenuIcon} alt='Menu icon' style={{ width: '20px', height: '20px' }} />
          </IconButton>
          <SwipeableDrawer open={drawer} onOpen={clickOpenDrawer} onClose={clickCloseDrawer} anchor='left'>
            <Expanded />
          </SwipeableDrawer>
        </>
        : <Expanded />
      }
    </>
  );
}

function Expanded() {
  return (
    <Paper className='search-bar-paper'>
      <div className='mb-2'>
        <h5>Lọc theo kích thước</h5>
        <SearchCheckSize />
      </div>
      <div className='mb-4'>
        <h5>Lọc theo giống</h5>
        <SearchCheckBreed />
      </div>
      <div>
        <h5>Lọc theo giá</h5>
        <SearchCheckPrice />
      </div>
    </Paper>
  )
}