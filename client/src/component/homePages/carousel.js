import React from "react";
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
const CarouselPage = () => {
  return (
    <CarouselCus items={items} animatedClass='animated fadeInDown' />
  );
}

export default CarouselPage;