import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import DogBoneImg from '../../image/background/dog-bon.png'
import Loader from '../loader/wakingLoader';
import { Button } from '@material-ui/core';
import SlickProducts from './slickProducts';
import { ProductContext } from '../products/productContext';

const H2Title = styled.h2`
  margin-bottom: 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: relative;
  font-weight: 300;
  font-size: 40px;
  text-transform: capitalize;
  &::after{
    background-color: #1e88e5;
    content: "";
    height: 1px;
    flex-grow: 1;
    -webkit-flex-grow: 1;
    margin: 15px 25px 0;
  }
`
const ImgDogBone = styled.img`
  position: absolute;
  top: 15px;
  right: 0;
  max-width: 100%;
  height: auto
  vertical-align: middle;
  border: 0;
`
const UlTitleTab = styled.ul`
  padding: 0;
  list-style: none;
  font-weight: 700;
  button{
    color: #1e88e5;
    background-color: white;
    padding: 8px 16px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    font-weight: 700;
    &:hover{
      color: #1e88e5;
      background-color: white;
    }
  }
`
const LiTab = styled.li`
  display: inline-block;
  vertical-align: top;
  margin: 0 3px;
`
export default function MeetTheDogs() {
  const [tabProduct, setTabProduct] = useState('new');
  const { products, loading } = useContext(ProductContext);
  const productsNew = products.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)).slice(0, 8);
  const productsView = products.sort((a, b) => b.viewCounts - a.viewCounts).slice(0, 8);
  const productsRate = products.sort((a, b) => b.rates - a.rates).slice(0, 8);
  return (
    <div className='container' style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <div>
        <H2Title className='dois-font'>
          Những Chú chó tiêu biểu
            <ImgDogBone src={DogBoneImg} alt='DogBoneImg' />
        </H2Title>
      </div>
      <div style={{ marginBottom: '35px' }}>
        <UlTitleTab className='text-right text-uppercase'>
          <LiTab>
            <Button
              className={tabProduct === 'new' ? 'active-tab' : ''}
              onClick={() => setTabProduct('new')}
            >NEW</Button>
          </LiTab>
          <LiTab>
            <Button
              className={tabProduct === 'topview' ? 'active-tab' : ''}
              onClick={() => setTabProduct('topview')}
            >TOP VIEW</Button>
          </LiTab>
          <LiTab>
            <Button
              className={tabProduct === 'toprating' ? 'active-tab' : ''}
              onClick={() => setTabProduct('toprating')}
            >TOP RATING</Button>
          </LiTab>
        </UlTitleTab>
      </div>
      {!loading ? (tabProduct === 'new' ? <SlickProducts products={productsNew} />
        : tabProduct === 'topview' ? <SlickProducts products={productsView} />
          : <SlickProducts products={productsRate} />)
        : <> <Loader /> <div style={{ height: '300px' }}></div></>}
    </div>

  )
}