import React, { useState, useEffect } from 'react';

import { FormControlLabel, FormGroup, FormControl, Checkbox } from '@material-ui/core';
export default function SearchCheckSize(props){
  const [size, setSize] = useState({
    s: false,
    m: false,
    l: false,
  });
  useEffect(() => {
    props.getValueSize(size)
  }, [size, props] )

  const CheckSize = name => event => {
    setSize({ ...size, [name]: event.target.checked });
  };
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