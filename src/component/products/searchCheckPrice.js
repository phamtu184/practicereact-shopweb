import React, { useState, useEffect } from 'react';

import { Slider} from '@material-ui/core';

export default function SearchCheckPrice(props){
  const [valuePrice, setValuePrice] = useState([20, 1500]);
  useEffect(() => {
    props.getValuePrice(valuePrice)
  }, [valuePrice, props] )

  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };
  return(
    <div className='w-100 slide-price'>
      <Slider
        value={valuePrice}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        min={20}
        max={1500}
      />
      <span>£{valuePrice[0]}-£{valuePrice[1]}</span>
    </div>
  )
}