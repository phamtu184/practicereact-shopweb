import React, { useState, useEffect } from "react";
import '../../style/animate.min.css'
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';
import CarouselControl from './CarouselControl';
import CarouselIndicators from './CarouselIndicators';
import CarouselCaption from './CarouselCaption';
import PropTypes from 'prop-types';
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
  );
}
CarouselCus.propTypes = {
  items: PropTypes.array,
  animatedClass: PropTypes.string,
};
export default CarouselCus;