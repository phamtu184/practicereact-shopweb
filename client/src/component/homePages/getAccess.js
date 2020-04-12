import React from 'react'

import styled from 'styled-components';
import GetAccessImg from '../../image/background/getaccess.jpg'
import DogBoneImg from '../../image/background/dog-bon.png'

const H2Style = styled.h2`
  font-size: 3em;
  font-weight: 300;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const H3Style = styled.h3`
  font-weight: 700;
  font-size: 2em;
  textTransform: upercase;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const ImgStyle = styled.img`
  max-width: 100%;
  height: auto;
  transition: transform 0.2s;
  &:hover{
    transform: scale(1.2);
  }
`
const PStyle = styled.p`
  color: #555;
  margin: 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400px;
  @media (max-width: 768px) {
    text-align: center;
  }
`
const POutsideA = styled.p`
@media (max-width: 768px) {
  text-align: center;
}
`
const LinkStyle = styled.button`
  line-height: inherit;
  height: auto;
  font-size: 30px;
  padding: 20px 50px 30px 60px;
  border-radius: 25px;
  background-color: #1e88e5;
  border: none;
  color: #fff !important;
  display: inline-block;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  margin-top: 1em;
  &:hover {
    background-color: #1565c0;
    transition: 0.3s
  };
  &::before{
    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 10px;
    right: 10px;
    border: 1px dashed rgba(255,255,255,0.5);
    content: "";
    border-radius: 10px;
  };
  &::after{
    content: "\f47a";
    font-family: ionicons;
    position: absolute;
    left: -24px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #fff;
    top: 47px;
    background: #1e88e5;
  }
`
const DogBonImg = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  vertical-align: middle;
  border: 0;
`
export default function GetAccess() {

  return (
    <div className='container' style={{ marginTop: '5rem' }}>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <ImgStyle src={GetAccessImg} alt='GetAccessImg' />
        </div>
        <div className='col-md-6 col-sm-12 mt-4 mb-4' >
          <H2Style className='dois-font' >Hãy tham gia với chúng tôi</H2Style>
          <H3Style className='dois-font color600'>Cộng đồng thân thiện!</H3Style>
          <PStyle >Register today and join the largest Emotional Support Animal database in the country. We will update you anytime the Federal Laws change, as well as other pertinent info related to your Emotional Support Animal.</PStyle>
          <POutsideA>
            <LinkStyle>
              <DogBonImg src={DogBoneImg} alt='DogBonImg' />
              Đăng kí miễn phí
            </LinkStyle>
          </POutsideA>
        </div>
      </div>
    </div>
  )
}