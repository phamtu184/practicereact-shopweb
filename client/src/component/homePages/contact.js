import React from 'react'

import styled from 'styled-components';
import DogCareImg from '../../image/background/dogcare.jpg'

const DivRow = styled.div`
  border-radius: 25px;
  padding: 50px 55px;
  box-shadow: 0px -10px 10px 0 rgba(0,0,0,0.05);
  z-index: 99;
  background: #fff;
  border: 1px solid #1e88e5;
`
const ImgDogCare = styled.img`
  max-width: 100%;
  height: auto;
`
const H2Title = styled.h2`
  text-transform: capitalize;
  font-weight: 300;
  margin-bottom: 10px;
  font-size: 60px;
`
const H3Title = styled.h3`
  text-transform: uppercase;
  color: #1e88e5;
  margin-bottom: 20px;
  font-weight: 700;
  font-size:30px
`
const PDesc = styled.p`
  margin-bottom: 37px;
  color: #555;
  line-height: 24px;
`
const AReadMore = styled.button`
  background-color: #1e88e5;
  border: none;
  height: 40px;
  color: #fff !important;
  line-height: 40px;
  border-radius: 10px;
  display: inline-block;
  padding: 0 20px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  &::before{
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
    border: 1px dashed rgba(255,255,255,0.5);
    content: "";
    border-radius: 10px;
  };
  &:hover{
    background-color: #1565c0;
    transition: 0.3s
  };
  &::after{
    content: "\f3d1";
    font-family: ionicons;
    font-weight: 400;
    margin-left: 10px;
    display: inline-block;
  }
`
export default function Contact() {
  return (
    <div className='container' style={{ marginTop: '5em' }}>
      <DivRow className='row'>
        <div className='col-md-6 col-sm-12'>
          <H2Title className='dois-font'>Dịch vụ chăm sóc</H2Title>
          <H3Title className='dois-font'>
            Số điện thoại: &nbsp;
            <span style={{ color: '#1565c0' }}>090 1876 345</span>
          </H3Title>
          <PDesc>Emotional support dogs are often identified by wearing an emotional support dog vest or tag, letting the public know that it is an emotional support dog; otherwise, their handlers will find themselves having to explain that their dog is an emotional support dog. Some businesses, such as airlines, prefer to see an identification card or vest that indicates that the dog is an emotional support dog.</PDesc>
          <AReadMore>Xem thêm</AReadMore>
        </div>
        <div className='col-md-6 col-sm-12'>
          <ImgDogCare src={DogCareImg} alt='DogCareImg' />
        </div>
      </DivRow>
    </div>
  )
}