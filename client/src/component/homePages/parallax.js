import React from 'react';
import styled from 'styled-components';
import ImgParallax from '../../image/background/parallax.jpg';

const SectionParallax = styled.section`
position: relative;
height: 70vh;
display: flex;
align-items: center;
justify-content: center;
color: white;
text-shadow: 0 0 5px #000;
@media only screen and (max-width: 800px){
  height: 50vh;
};
&::after{
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(-1px) scaleY(1.35);
  background-size: 120%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  z-index: -1;
  background-image: url(${ImgParallax});
  @media only screen and (max-width: 1300px){
    background-size: 150%;
  };
  @media only screen and (max-width: 1100px){
    background-size: auto;
  };
}
`
export default function Parallax() {
  return (
    <SectionParallax>
      <h1>Dogs are friends. Not foods</h1>
    </SectionParallax>
  )
}