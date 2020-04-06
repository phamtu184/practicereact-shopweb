import React, { useContext } from 'react';

import { Checkbox, TextField, Slider, Chip } from '@material-ui/core';
import { ProductContext } from './productContext';
export function SearchCheckBreed() {
  const { breed, setBreed, productsTemp } = useContext(ProductContext);
  const labrador = productsTemp.filter(e => e.breed === 'labrador');
  const pug = productsTemp.filter(e => e.breed === 'pug');
  const corgi = productsTemp.filter(e => e.breed === 'corgi');
  const bloodhound = productsTemp.filter(e => e.breed === 'bloodhound');
  const changeSearchBreed = (event) => {
    setBreed({
      labrador: false,
      pug: false,
      corgi: false,
      bloodhound: false,
      search: event.target.value
    })
  }
  const checkBreedLabrador = () => {
    setBreed({ labrador: !breed.labrador, pug: false, corgi: false, bloodhound: false, search: '' });
  };
  const checkBreedPug = () => {
    setBreed({ labrador: false, pug: !breed.pug, corgi: false, bloodhound: false, search: '' });
  };
  const checkBreedCorgi = () => {
    setBreed({ labrador: false, pug: false, corgi: !breed.corgi, bloodhound: false, search: '' });
  };
  const checkBreedBloodhound = () => {
    setBreed({ labrador: false, pug: false, corgi: false, bloodhound: !breed.bloodhound, search: '' });
  };
  // const changeSearchBreed = (event) => {
  //   setBreed({
  //     labrador: false,
  //     pug: false,
  //     corgi: false,
  //     bloodhound: false,
  //     search: event.target.value
  //   })
  // }
  // const CheckBreed = name => event => {
  //   setBreed({ ...breed, [name]: event.target.checked, search: '' });
  // };
  const items = [
    {
      breed: breed.labrador,
      onChange: checkBreedLabrador,
      value: 'labrador',
      label: labrador.length
    },
    {
      breed: breed.pug,
      onChange: checkBreedPug,
      value: 'pug',
      label: pug.length
    },
    {
      breed: breed.corgi,
      onChange: checkBreedCorgi,
      value: 'corgi',
      label: corgi.length
    },
    {
      breed: breed.bloodhound,
      onChange: checkBreedBloodhound,
      value: 'bloodhound',
      label: bloodhound.length
    }
  ]
  return (
    <>
      {items.map((item, index) => (
        <label className='search-bar-label' key={index}>
          <Checkbox checked={item.breed} onChange={item.onChange} />
          <span className='color-span'>{item.value}</span>
          <Chip size="small" label={item.label} className='chip-nums' />
        </label>
      ))}
      <TextField label="Giống" variant="filled" value={breed.search} onChange={changeSearchBreed} size='small' />
    </>
  )
}
export function SearchCheckSize() {
  const { size, setSize, productsTemp } = useContext(ProductContext);
  const checkSizeS = () => {
    setSize({
      s: !size.s, m: false, l: false
    })
  }
  const checkSizeM = () => {
    setSize({
      s: false, m: !size.m, l: false
    })
  }
  const checkSizeL = () => {
    setSize({
      s: false, m: false, l: !size.l
    })
  }
  const sNumber = productsTemp.filter(e => e.size === 'nhỏ');
  const mNumber = productsTemp.filter(e => e.size === 'vừa');
  const lNumber = productsTemp.filter(e => e.size === 'lớn');
  const items = [
    {
      size: size.s,
      onChange: checkSizeS,
      value: 's',
      label: sNumber.length
    },
    {
      size: size.m,
      onChange: checkSizeM,
      value: 'm',
      label: mNumber.length
    },
    {
      size: size.l,
      onChange: checkSizeL,
      value: 'l',
      label: lNumber.length
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