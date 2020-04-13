import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from "react-slick";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  slidesPerRow: 2
};
export default function ProductSlick() {

  return (
    <div>
      <Slider {...settings}>

      </Slider>
    </div>
  )
}