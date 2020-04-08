import React from 'react'
import Dog1 from '../../image/dogs/dog1.png'
import Dog2 from '../../image/dogs/dog2.png'
import Dog3 from '../../image/dogs/dog3.png'
import Dog4 from '../../image/dogs/dog4.png'
import Dog5 from '../../image/dogs/dog5.png'
import Dog6 from '../../image/dogs/dog6.png'
import Dog7 from '../../image/dogs/dog7.png'
import Dog8 from '../../image/dogs/dog8.png'
import Slider from "react-slick";

const items = [
  {
    src: Dog1,
    alt: 'dog1'
  },
  {
    src: Dog2,
    alt: 'dog2'
  },
  {
    src: Dog3,
    alt: 'dog3'
  },
  {
    src: Dog4,
    alt: 'dog4'
  },
  {
    src: Dog5,
    alt: 'dog5'
  },
  {
    src: Dog6,
    alt: 'dog6'
  },
  {
    src: Dog7,
    alt: 'dog7'
  },
  {
    src: Dog8,
    alt: 'dog8'
  }
]
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 7,
      }
    },
    {
      breakpoint: 910,
      settings: {
        slidesToShow: 6,
      }
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 4,
      }
    }
    ,
    {
      breakpoint: 515,
      settings: {
        slidesToShow: 3,
      }
    }
  ]
};
export default function DogsFooter() {

  return (
    <div className='dogs-footer'>
      <Slider {...settings} className='container-xl'>
        {items.map((item, index) => (
          <div key={index} className='dog-item'>
            <img src={item.src} alt={items.alt} style={{ float: 'left' }} />
          </div>
        ))}
      </Slider >
    </div>
  )
}