import React, { useState, useEffect } from "react";
import '../../style/animate.min.css'
import Carousel from './carousel/Carousel';
import CarouselItem from './carousel/CarouselItem';
import CarouselControl from './carousel/CarouselControl';
import CarouselIndicators from './carousel/CarouselIndicators';
import CarouselCaption from './carousel/CarouselCaption';

import Background1 from '../../image/background.jpg';
import Background2 from '../../image/background2.jpg';
import Background3 from '../../image/background3.jpg';
//import { Button } from '@material-ui/core';

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
const CarouselPage = () => {
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
        <img src={item.src} alt={item.altText} style={{objectPosition:`center ${scroll}px`}}/>
        <CarouselCaption
          className="animated fadeInDown"
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
      onScroll={()=>console.log('ss')}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselPage;