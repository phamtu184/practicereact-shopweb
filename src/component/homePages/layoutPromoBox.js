import React from "react";

const items = {
  img1: {
    alt: '1',
    src: 'http://dummyimage.com/910x780.png/dddddd/000000',
    title: 'hello'
  },
  img2: {
    alt: '2',
    src: 'http://dummyimage.com/910x780.png/dddddd/000000',
    title: 'hello'
  },
  img3: {
    alt: '3',
    src: 'http://dummyimage.com/910x1600.png/dddddd/000000',
    title: 'hello'
  },
  img4: {
    alt: '4',
    src: 'http://dummyimage.com/910x780.png/dddddd/000000',
    title: 'hello'
  },
  img5: {
    alt: '5',
    src: 'http://dummyimage.com/910x780.png/dddddd/000000',
    title: 'hello'
  },
  img6: {
    alt: '6',
    src: 'http://dummyimage.com/1680x780.png/dddddd/000000',
    title: 'hello'
  }
}
export default function LayoutPromoBox() {

  return (
    <div className='container-fluid promobox-layout'>
      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <div className='row'>
            <div className='col-sm-6'>
              <a href='/#'>
                <img alt={items.img1.alt} src={items.img1.src} />
                <div className='tt-background'>{items.img1.title}</div>
              </a>
              <a href='/#'>
                <img alt={items.img2.alt} src={items.img2.src} />
                <div className='tt-background'>{items.img2.title}</div>
              </a>
            </div>
            <div className='col-sm-6'>
              <a href='/#'>
                <img alt={items.img3.alt} src={items.img3.src} />
                <div className='tt-background'>{items.img3.title}</div>
              </a>
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-6'>
          <div className='row'>
            <div className='col-sm-6'>
              <a href='/#'>
                <img alt={items.img4.alt} src={items.img4.src} />
                <div className='tt-background'>{items.img4.title}</div>
              </a>
            </div>
            <div className='col-sm-6'>
              <a href='/#'>
                <img alt={items.img5.alt} src={items.img5.src} />
                <div className='tt-background'>{items.img5.title}</div>
              </a>
            </div>
            <div className='col-sm-12'>
              <a href='/#'>
                <img alt={items.img6.alt} src={items.img6.src} />
                <div className='tt-background'>{items.img6.title}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}