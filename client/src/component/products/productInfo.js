import React from 'react';

import "react-image-gallery/styles/scss/image-gallery.scss";
import { Chip } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';

export default function ProductInfo(props) {
  const { product } = props;
  return (
    <>
      {product.images
        ? <div className='row product-info'>
          <div className='col-sm-5 product-img-gallery'>
            <ImageGallery
              items={[
                {
                  original: product.images[0],
                  thumbnail: product.images[0],
                  originalClass: 'image-product'
                },
                {
                  original: product.images[1],
                  thumbnail: product.images[1],
                  originalClass: 'image-product'
                },
                {
                  original: product.images[2],
                  thumbnail: product.images[2],
                  originalClass: 'image-product'
                },
                {
                  original: product.images[3],
                  thumbnail: product.images[3],
                  originalClass: 'image-product'
                }
              ]}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </div>
          <div className='col-sm-7'>
            <div className='product-detail'>
              <h1 className='product-detail-title dois-font'>{product.name}</h1>
              <span className='dois-font product-detail-price'>£{product.price}</span>
              <hr />
              <div className='product-detail-desc'>
                <p>{product.description}</p>
              </div>
              <div className='product-detail-chip'>
                <div>
                  <label className='mr-2'>Khả dụng:</label>
                  <Chip size="small" label='Còn hàng' variant="outlined" />
                </div>
                <div>
                  <label className='mr-2'>Tags:</label>
                  <Chip size="small" label={product.breed} variant="outlined" />
                  <Chip size="small" label={product.gender} variant="outlined" />
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
      }
    </>
  )
}