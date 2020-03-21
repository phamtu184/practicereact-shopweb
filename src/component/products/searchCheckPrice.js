import React, { useContext } from 'react';

import { Slider} from '@material-ui/core';
import { ProductContext } from './productContext';

export default function SearchCheckPrice(props){
  // useEffect(() => {
  //   props.getValuePrice(valuePrice)
  // }, [valuePrice, props] )
  const { valuePrice, handleChangePrice } = useContext(ProductContext);
  
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