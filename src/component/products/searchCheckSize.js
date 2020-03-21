import React, { useContext } from 'react';

import { FormControlLabel, FormGroup, FormControl, Checkbox } from '@material-ui/core';
import { ProductContext } from './productContext';

export default function SearchCheckSize(){
  const { size, CheckSize } = useContext(ProductContext);
  return(
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={size.s} onChange={CheckSize('s')} value="s" />}
          label="S"
        />
        <FormControlLabel
          control={<Checkbox checked={size.m} onChange={CheckSize('m')} value="m" />}
          label="M"
        />
        <FormControlLabel
          control={
            <Checkbox checked={size.l} onChange={CheckSize('l')} value="l" />
          }
          label="L"
        />
      </FormGroup>
    </FormControl>
  )
}