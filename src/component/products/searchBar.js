import React, { useState } from 'react';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
  SwipeableDrawer, useMediaQuery, IconButton } from '@material-ui/core';
import MenuIcon from '../../image/svglogo/menu.svg';

import SearchCheckSize from './searchCheckSize';
import SearchCheckBreed from './searchCheckBreed';
import SearchCheckPrice from './searchCheckPrice';

export default function SearchBar(){
  const [drawer, setDrawer] = useState(false);
  const clickOpenDrawer = () =>{
    setDrawer(true);
  }
  const clickCloseDrawer = () =>{
    setDrawer(false);
  }
  
  const matches = useMediaQuery('(max-width:992px)');
  return (
    <>
    {matches
    ?<>
      <IconButton onClick={clickOpenDrawer}>
        <img src={MenuIcon} alt='Menu icon' style={{width:'20px', height:'20px'}}/>
      </IconButton>
      <SwipeableDrawer open={drawer} onOpen={clickOpenDrawer} onClose={clickCloseDrawer} anchor='left'>
        <Expanded/>
      </SwipeableDrawer>
    </>
    : <Expanded/>
    }
    </>
  );
}

function Expanded(){
  const [expanded, setExpanded] = useState({
    size: true,
    breed: true,
    price: true
  });
  const [searchSize, setSearchSize] = useState()
  const [searchBreed, setSearchBreed] = useState()
  const [searchPrice, setSearchPrice] = useState()

  const ChangeExpandedSize = () => {
    setExpanded({...expanded, size:!expanded.size});
  };
  const ChangeExpandedBreed = () => {
    setExpanded({...expanded, breed:!expanded.breed});
  };
  const ChangeExpandedPrice = () => {
    setExpanded({...expanded, price:!expanded.price});
  };
  const getSize = (data) => {
    setSearchSize(data)
  }
  const getBreed = (data) => {
    setSearchBreed(data)
  }
  const getPrice = (data) => {
    setSearchPrice(data)
  }
  return(
    <>
      <ExpansionPanel square expanded={expanded.size} onChange={ChangeExpandedSize}>
        <ExpansionPanelSummary>
          <Typography>Lọc theo kích thước</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SearchCheckSize getValueSize={getSize}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded.breed} onChange={ChangeExpandedBreed}>
        <ExpansionPanelSummary>
          <Typography>Lọc theo giống</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SearchCheckBreed getValueBreed={getBreed}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded.price} onChange={ChangeExpandedPrice}>
        <ExpansionPanelSummary>
          <Typography >Lọc theo giá</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SearchCheckPrice getValuePrice={getPrice}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}