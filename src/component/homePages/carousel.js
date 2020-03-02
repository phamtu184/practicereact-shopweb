import React from "react";
import Slider from "react-slick";
import Background from '../../image/background.jpg'
import Background2 from '../../image/background2.jpg'
import Background3 from '../../image/background3.jpg'

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right:'25px'}}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left:'25px', zIndex: '2'}}
      onClick={onClick}
    />
  );
}

const CarouselPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <div className='carousel'>
      <Slider {...settings}>
        <div>
          <img src={Background} alt='background1'/>
        </div>
        <div>
          <img src={Background2} alt='background2'/>
        </div>
        <div>
          <img src={Background3} alt='background3'/>
        </div>
      </Slider>
    </div>
  );
}

export default CarouselPage;