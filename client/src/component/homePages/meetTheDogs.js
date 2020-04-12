import React from 'react';
import styled from 'styled-components';
import DogBoneImg from '../../image/background/dog-bon.png'

const H2Title = styled.h2`
  margin-bottom: 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  position: relative;
  font-weight: 300;
  font-size: 60px;
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
export default function MeetTheDogs() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <div className='container' >
        <div>
          <H2Title className='dois-font'>
            Những Chú chó tiêu biểu
            <ImgDogBone src={DogBoneImg} alt='DogBoneImg' />
          </H2Title>
        </div>
      </div>
    </div>

  )
}