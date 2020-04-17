import React from 'react';
import styled from 'styled-components';
import ImgPrice from '../../image/background/price.jpg';

const DivBannerAdv = styled.div`
display: inline-block;
position: relative;
`
const AThumbLink = styled.a`
display: block;
overflow: hidden;
position: relative;
img{
  display: block;
  width: 100%;
  transition: all 0.3s ease-out 0s;
  -webkit-transition: all 0.3s ease-out 0s;
  max-width: 100%;
  height: auto;
}
`
const DivBannerInfo = styled.div`
left: auto;
bottom: auto;
top: 30px;
right: 100px;
margin: auto;
position: absolute;
z-index: 9;
`
const DivTitleBanner = styled.div`
background-color: #1e88e5;
width: 130px;
height: 130px;
border-radius: 50%;
text-align: center;
border: 1px dashed #fff;
display: flex;
flex-direction: column;
justify-content: center;
display: -webkit-flex;
-webkit-flex-direction: column;
-webkit-justify-content: center;
padding: 0 20px;
transform: rotate(-45deg);
-webkit-transform: rotate(-45deg);
color: #fff;
box-shadow: 0 0 0 20px rgba(30,136,229,0.5);
background: #1e88e5;
`
const DivTextLeft = styled.div`
text-align: left;
strong{
  position: relative;
  font-weight: 700;
  font-size: 30px;
  &:after{
    background: #fff;
    height: 2px;
    width: 60px;
    content: "";
    right: -5px;
    bottom: 0;
    z-index: 1;
    position: absolute;
  }
}
`
const DivTextRight = styled.div`
text-align: right;
strong{
  font-weight: 300;
  font-size: 18px;
  margin: 0;
}
`
export default function PriceService() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <DivBannerAdv>
            <AThumbLink href='#'>
              <img src={ImgPrice} alt='ImgPrice' />
            </AThumbLink>
            <DivBannerInfo>
              <DivTitleBanner className='text-uppercase dosis-font'>
                <DivTextLeft>
                  <strong>Price</strong>
                </DivTextLeft>
                <DivTextRight>
                  <strong>services</strong>
                </DivTextRight>
              </DivTitleBanner>
            </DivBannerInfo>
          </DivBannerAdv>
        </div>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-sm-6 mt-4'>
              <ItemInfoPrice title='DOG DAYCARE' time='FULL DAY' price='$29' desc='$15 for full day on weekends' />
            </div>
            <div className='col-sm-6 mt-4'>
              <ItemInfoPrice title='DOG GROOMING' time='FULL GROOM' price='$45' desc='Make an appointment' />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6 mt-4'>
              <ItemInfoPrice title='CAGELESS DOG BOARDING' time='OVERNIGHT BOARDING' price='$39' desc='Additional Dogs: $28 per night' />
            </div>
            <div className='col-sm-6 mt-4'>
              <ItemInfoPrice title='DAYCARE SAVINGS PASSES' time='10 FULL – DAY PLAYS' price='$190' desc='10 Full – Day Plays $170 ($20 savings)' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const DivItemInfoPrice = styled.div`
text-align: center;
border: 1px solid #e5e5e5;
box-shadow: 0 5px 5px 0 rgba(0,0,0,0.07);
padding: 35px 15px 40px;
h3{
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 18px;
}
h4{
  margin-bottom: 20px;
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
h2{
  color:#1e88e5;
  font-size: 30px;
  margin-bottom: 20px;
  sup{
    font-size: 18px;
    color:#1e88e5;
  }
}
p{
  margin-bottom: 22px;
  color: #555;
  margin: 0;
  line-height: 24px;
}
a{
  background-color: #1e88e5;
  background: #1e88e5;
  border: none;
  height: 40px;
  color: #fff;
  line-height: 40px;
  border-radius: 10px;
  display: inline-block;
  padding: 0 20px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  &:before{
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
    border: 1px dashed rgba(255,255,255,0.5);
    content: "";
    border-radius: 10px;
  }
  &:after{
    content: "\f3d1";
    font-family: ionicons;
    font-weight: 400;
    margin-left: 10px;
    display: inline-block;
  }
  &:hover{
    background-color: #1565c0;
    transition: 0.3s
  };
}
`
function ItemInfoPrice(props) {
  const { title, time, price, desc } = props
  return (
    <DivItemInfoPrice>
      <h3 className='dois-font text-uppercase'>{title}</h3>
      <h4 className='dois-font text-uppercase'>{time}</h4>
      <h2 className='dois-font'>{price}<sup>.00</sup></h2>
      <p className='mb-3'>{desc}</p>
      <a href='/#'>read more</a>
    </DivItemInfoPrice>
  )
}