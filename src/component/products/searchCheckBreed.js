import React, { useContext } from 'react';

import { FormControlLabel, FormGroup, FormControl, Checkbox, TextField} from '@material-ui/core';
import { ProductContext } from './productContext';
export default function SearchCheckBreed(props){
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