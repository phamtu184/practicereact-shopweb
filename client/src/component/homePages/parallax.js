import React from 'react';
import styled from 'styled-components';
import ImgParallax from '../../image/background/parallax.jpg';

const SectionParallax = styled.section`
position: relative;
height: 80vh;
display: flex;
align-items: center;
justify-content: center;
color: white;
text-shadow: 0 0 5px #000;
&::after{
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateZ(-1px) scale(1.4);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  z-index: -1;
  background-image: url(${ImgParallax});
}
`
export default function Parallax(props) {
  return (
    <SectionParallax>
      <h1>Dogs are friends. Not foods</h1>
    </SectionParallax>
  )
}