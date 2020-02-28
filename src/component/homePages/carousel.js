import React from "react";
import Slider from "react-slick";
import Background from '../../image/background.jpg'
import Background2 from '../../image/background2.jpg'
import Background3 from '../../image/background3.jpg'

const settingimg = {
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: 'auto',
}
const CarouselPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };
  return (
    <div className='container carousel'>
      <Slider {...settings}>
        <div>
          <img src={Background} style={settingimg} alt='background1'/>
        </div>
        <div>
          <img src={Background2} style={settingimg} alt='background2'/>
        </div>
        <div>
          <img src={Background3} style={settingimg} alt='background3'/>
        </div>
      </Slider>
    </div>
  );
}

export default CarouselPage;