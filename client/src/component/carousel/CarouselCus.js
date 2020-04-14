import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';
import CarouselCaption from './CarouselCaption';
import PropTypes from 'prop-types';
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
const CarouselCus = (props) => {
  const { items, animatedClass } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  })
  const handleScroll = () => {
    let scrollTop = window.pageYOffset / 2.5
    setScroll(scrollTop)
  }
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style={{ objectPosition: `center ${scroll}px` }} />
        <CarouselCaption
          className={animatedClass}
          captionText={item.captionText}
          captionHeader3={item.captionHeader3}
          captionHeader1={item.captionHeader1}
          captionButton={item.captionButton}
        />
      </CarouselItem>
    );
  });
  return (
    <DivCarousel>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className='carousel carousel-fade'
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    </DivCarousel>
  );
}
CarouselCus.propTypes = {
  items: PropTypes.array,
  animatedClass: PropTypes.string,
};
export default CarouselCus;