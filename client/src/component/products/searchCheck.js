import React, { useContext } from 'react';

import { Checkbox, TextField, Slider, Chip } from '@material-ui/core';
import { ProductContext } from './productContext';
export function SearchCheckBreed() {
  const { breed, changeSearchBreed, CheckBreed } = useContext(ProductContext);
  const items = [
    {
      breed: breed.labrador,
      onChange: CheckBreed('labrador'),
      value: 'labrador',
      label: 'Basic'
    },
    {
      breed: breed.pug,
      onChange: CheckBreed('pug'),
      value: 'pug',
      label: 'Basic'
    },
    {
      breed: breed.corgi,
      onChange: CheckBreed('corgi'),
      value: 'corgi',
      label: 'Basic'
    },
    {
      breed: breed.bloodhound,
      onChange: CheckBreed('bloodhound'),
      value: 'bloodhound',
      label: 'Basic'
    }
  ]
  return (
    <>
      {items.map((item, index) => (
        <label className='search-bar-label' key={index}>
          <Checkbox checked={item.breed} onChange={item.onChange} value={item.value} />
          <span className='color-span'>{item.value}</span>
          <Chip size="small" label={item.label} className='chip-nums' />
        </label>
      ))}
      <TextField label="Giống" variant="filled" value={breed.search} onChange={changeSearchBreed} size='small' />
    </>
  )
}

export function SearchCheckPrice() {
  // useEffect(() => {
  //   props.getValuePrice(valuePrice)
  // }, [valuePrice, props] )
  const { valuePrice, handleChangePrice } = useContext(ProductContext);
  return (
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

export function SearchCheckSize() {
  const { size, CheckSize } = useContext(ProductContext);
  const items = [
    {
      size: size.s,
      onChange: CheckSize('s'),
      value: 's',
      label: 'basic'
    },
    {
      size: size.m,
      onChange: CheckSize('m'),
      value: 'm',
      label: 'basic'
    },
    {
      size: size.l,
      onChange: CheckSize('l'),
      value: 'l',
      label: 'basic'
    }
  ]
  return (
    <div>
      {items.map((item, index) => (
        <label className='search-bar-label' key={index}>
          <Checkbox checked={item.size} onChange={item.onChange} />
          <span className='color-span'>{item.value}</span>
          <Chip size="small" label={item.label} className='chip-nums' />
        </label>
      ))}
    </div>
  )
}