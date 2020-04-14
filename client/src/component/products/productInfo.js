import React from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';

const DivProDetail = styled.div`
  color: #444;
  .product-detail-title{
    margin-bottom: 20px;
    margin: 0 0 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    font-size: 24px;
    text-transform: uppercase;
  }
  .product-detail-price{
    font-size: 20px;
    font-weight: 720;
    color: #1e88e5;
    margin-bottom: 13px;
  }
  .product-detail-desc{
    margin-bottom: 25px;
    line-height: 24px;
  }
`
const DivImgGallery = styled.div`
.image-gallery{
  button{
    svg{
      height: 60px;
      width: 30px;
      &:hover{
        color: #1e88e5
      }
    }
  }
  .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus{
    border: 2px solid #1e88e5;
  }
  .image-gallery-thumbnails{
    button{
      width: 70px;
    }
  }
}
`
export default function ProductInfo(props) {
  const { product } = props;
  return (
    <>
      {product.images
        ? <div className='row product-info'>
          <DivImgGallery className='col-sm-5'>
            <ImageGallery
              items={[
                {
                  original: product.images[0],
                  thumbnail: product.images[0],
                },
                {
                  original: product.images[1],
                  thumbnail: product.images[1],
                },
                {
                  original: product.images[2],
                  thumbnail: product.images[2],
                },
                {
                  original: product.images[3],
                  thumbnail: product.images[3],
                }
              ]}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          </DivImgGallery>
          <div className='col-sm-7'>
            <DivProDetail>
              <h1 className='product-detail-title dois-font'>{product.name}</h1>
              <span className='dois-font product-detail-price'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}</span>
              <hr />
              <div className='product-detail-desc'>
                <p>{product.description}</p>
              </div>
              <div className='product-detail-chip'>
                <div>
                  <label className='mr-2'>Lượt xem:</label>
                  <Chip size="small" label={product.viewCounts} variant="outlined" />
                </div>
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
            </DivProDetail>
          </div>
        </div>
        : null
      }
    </>
  )
}