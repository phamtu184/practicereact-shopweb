import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImgBanner from '../../image/background/banner2.jpg'

const DivCountDownSection = styled.div`
background-image: url(${ImgBanner});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
padding: 150px 0 200px;
&:before{
  content: " ";
  display: table;
}
&:after{
  content: " ";
  display: table;
}
@media (max-width: 767px){
  padding: 100px 0 150px;
}
@media (max-width: 560px){
  padding: 50px 0 100px;
}
`
const H2Title = styled.h2`
font-weight: 300;
font-size: 60px;
text-tranform: capitalize;
`
const H3Title = styled.h3`
font-weight: 700;
color: #1e88e5;
font-size: 30px;
text-transform: uppercase;
`
const DivFinalCountDown = styled.div`
margin: 0 -15px;
@media (max-width: 560px){
  margin : 0 -5px 15px;
}
`
const DivClock = styled.div`
display: inline-block;
text-align: center;
margin: 0 15px;
font-weight: 700;
text-transform: uppercase;
@media (max-width: 560px){
  margin : 0 5px;
}
`
const StrongNum = styled.strong`
min-width: 100px;
display: block;
height: 100px;
background: #999;
color: #fff;
line-height: 100px;
font-size: 60px;
position: relative;
border-radius: 10px;
padding: 0 15px;
position:relative;
&:after{
	position:absolute;
	top:50%;
	left:0;
	right:0;
	height:16px;
	content:"";
	border-left:2px solid #e5e5e5;
	border-right:2px solid #e5e5e5;
	margin-top:-8px;
}
&:before{
	position:absolute;
	top:50%;
	left:0;
	right:0;
	height:1px;
	content:"";
	background:rgba(0,0,0,0.1);
}
@media (max-width: 560px){
  min-width: 50px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  border-radius: 4px;
  padding: 0 10px;
}
`
const PText = styled.p`
font-size: 18px;
color:#555;
margin-top:12px;
display:inline-block;
`
export default function CountDown() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  useEffect(() => {
    const timerId = setInterval(() => countTime('2022-12-25'), 1000)
    return () => clearInterval(timerId)
  }, [time])
  const countTime = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date())
    const seconds = Math.floor(time / 1000 % 60)
    const minutes = Math.floor(time / 1000 / 60 % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))

    setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds })
  }
  return (
    <DivCountDownSection>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 dois-font'>
            <H2Title >Câu lạc bộ</H2Title>
            <H3Title >Huấn luyện chó</H3Title>
            <DivFinalCountDown>
              <DivClock >
                <StrongNum style={{ backgroundColor: '#999' }}>{time.days}</StrongNum>
                <PText>Ngày</PText>
              </DivClock>
              <DivClock >
                <StrongNum style={{ backgroundColor: '#1e88e5' }}>{time.hours}</StrongNum>
                <PText>Giờ</PText>
              </DivClock>
              <DivClock >
                <StrongNum style={{ backgroundColor: '#1976d2' }}>{time.minutes}</StrongNum>
                <PText>Phút</PText>
              </DivClock>
              <DivClock >
                <StrongNum style={{ backgroundColor: '#12a152' }}>{time.seconds}</StrongNum>
                <PText>Giây</PText>
              </DivClock>
            </DivFinalCountDown>
          </div>
        </div>

      </div>

    </DivCountDownSection>
  )
}


