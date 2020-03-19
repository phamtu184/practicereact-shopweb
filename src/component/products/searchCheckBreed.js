import React, { useState, useEffect } from 'react';

import { FormControlLabel, FormGroup, FormControl, Checkbox, TextField} from '@material-ui/core';
export default function SearchCheckBreed(props){
  const [breed, setBreed] = useState({
    pug: false,
    husky: false,
    chowchow: false,
    poodle: false,
    search:''
  });
  useEffect(() => {
    props.getValueBreed(breed)
  }, [breed, props] )

  const CheckBreed = name => event => {
    setBreed({ ...breed, [name]: event.target.checked });
  };
  const changeSearch = (event) =>{
    setBreed({
      pug: false,
      husky: false,
      chowchow: false,
      poodle: false,
      search: event.target.value
    })
  }
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
        <TextField label="Giống" variant="filled" value={breed.search} onChange={changeSearch}/>
      </FormGroup>
    </FormControl>
  )
}