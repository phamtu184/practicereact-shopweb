import React, { useContext } from 'react';

import { FormControlLabel, FormGroup, FormControl, Checkbox, TextField, Slider} from '@material-ui/core';
import { ProductContext } from './productContext';
export function SearchCheckBreed(props){
  const { breed, changeSearchBreed, CheckBreed } = useContext(ProductContext);
  
  return(
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={breed.pug} onChange={CheckBreed('pug')} value="pug" />}
          label="Pug"
        />
        <FormControlLabel
          control={<Checkbox checked={breed.husky} onChange={CheckBreed('husky')} value="husky" />}
          label="Husky"
        />
        <FormControlLabel
          control={
            <Checkbox checked={breed.chowchow} onChange={CheckBreed('chowchow')} value="chowchow" />
          }
          label="Chow Chow"
        />
        <FormControlLabel
          control={
            <Checkbox checked={breed.poodle} onChange={CheckBreed('poodle')} value="poodle" />
          }
          label="Poodle"
        />
        <TextField label="Giống" variant="filled" value={breed.search} onChange={changeSearchBreed}/>
      </FormGroup>
    </FormControl>
  )
}

export function SearchCheckPrice(props){
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


export function SearchCheckSize(){
  const { size, CheckSize } = useContext(ProductContext);
  return(
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={size.s} onChange={CheckSize('s')}/>}
          label="S"
        />
        <FormControlLabel
          control={<Checkbox checked={size.m} onChange={CheckSize('m')}/>}
          label="M"
        />
        <FormControlLabel
          control={
            <Checkbox checked={size.l} onChange={CheckSize('l')}/>
          }
          label="L"
        />
      </FormGroup>
    </FormControl>
  )
}