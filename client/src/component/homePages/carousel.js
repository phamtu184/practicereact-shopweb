import React from "react";
import styled from 'styled-components';
import CarouselCus from '../carousel/CarouselCus';

import Background1 from '../../image/background/background.jpg';
import Background2 from '../../image/background/background2.jpg';
import Background3 from '../../image/background/background3.jpg';

const items = [
  {
    src: Background1,
    altText: 'Slide 1',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background2,
    altText: 'Slide 2',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background3,
    altText: 'Slide 3',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  }
];
const DivCarousel = styled.div`
  .carousel{
    .carousel-fade .carousel-item {
      display: block;
      position: absolute;
      opacity: 0;
      transition: opacity .75s ease-in-out;
    }
    .carousel-fade .carousel-item.active {
      opacity: 1;
    }
    .carousel-caption {
      bottom: 30%;
      h1{
        font-size: 5rem;
      }
      h3{
        font-size: 2.5rem;    
      }
      h3, h1, p{
        text-shadow: 1px 1px 2px #333;
      }
      .MuiButton-text{
        padding: 6px 18px;
        text-shadow: 1px 1px 2px #333;
      }
      .MuiButton-root{
        color: white;
        background-color: #1976d2
      }
      .MuiButton-root:hover{
        background-color: #1565c0
      }
    }
    img{
      width: 100%;
      height: 80vh;
    }
    .animated{
      animation-delay: 0.2s; animation-duration: 1s
    }
  }
  @media screen and (max-width: 800px) {
    .carousel{
      img{
        height: 40vh;
      }
      .carousel-caption {
        display: block !important;
        h1{
          font-size: 3rem;
        }
        h3{
          font-size: 1.5rem;
        }
      }
    }
  }
`
const CarouselPage = () => {
  return (
    <DivCarousel>
      <CarouselCus items={items} animatedClass='animated fadeInDown' />
    </DivCarousel>

  );
}

export default CarouselPage;