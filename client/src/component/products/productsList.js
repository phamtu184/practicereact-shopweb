import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Button, Box, IconButton, SvgIcon, Tooltip } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import WalkingLoader from './wakingLoader';
import Pagination from './pagination';
import ModalInfo from './modalInfo';
import { SearchIcon, HeartIcon } from '../../image/jslogo/svlogo';
import SyncIcon from '../../image/jslogo/Sync';
import { ProductContext } from './productContext';
import { CartContext } from '../../context/cart';
import SnackBar from '../snackBar/snackBar';
import { Link } from 'react-router-dom'

const DivProInfo = styled.div`
.product-img-gallery{
  .image-gallery{
    .image-gallery-icon:hover{
      color:#2196f3
    }
    .image-gallery-svg{
      height: 60px;
      width: 30px;
    }
    .image-gallery-thumbnails{
      button{
        width: 70px;
      }
      .image-gallery-thumbnail.active, 
      .image-gallery-thumbnail:hover, 
      .image-gallery-thumbnail:focus{
        border: 1px solid #2196f3
      }
    }
  }
}
h3{
  margin-bottom: 20px;
  margin: 0 0 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  color: #1e88e5
}
.product-price{
  font-size: 20px;
  font-weight: 720;
  color: #1e88e5;
  margin-bottom: 13px;
}
`
const labels = {
  1: 'Tệ',
  2: 'Kém',
  3: 'Ổn',
  4: 'Tốt',
  5: 'Xuất sắc',
};
const EditTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#03a9f4',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export default function ProductsList() {
  const { products, loading } = useContext(ProductContext);
  const { addToCart, openSnackbar, infoSnackbar, typeSnackbar, closeSnackbar } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState([]);

  const handleOpenModal = (product) => {
    setProduct(product)
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {loading ? <WalkingLoader />
        : <>
          <div className='product-list mt-3'>
            {products.map((item, index) => (
              <div className='col-sm-6 col-lg-4 mb-4' key={index}>
                <div className='product-thumb'>
                  <div className='product-extra-link'>
                    <ul>
                      <li>
                        <EditTooltip title="Yêu thích" arrow placement="top"
                          PopperProps={{ disablePortal: true }}
                        >
                          <IconButton ><Hearticon /></IconButton>
                        </EditTooltip>
                      </li>
                      <li>
                        <EditTooltip title="Thông tin" arrow placement="top"
                          PopperProps={{ disablePortal: true }}
                        >
                          <IconButton onClick={() => handleOpenModal(item)}><Searchicon /></IconButton>
                        </EditTooltip>
                      </li>
                      <li>
                        <EditTooltip title="Chi tiết" arrow placement="top"
                          PopperProps={{ disablePortal: true }}
                        >
                          <Link to={'/product/' + item._id}>
                            <IconButton ><SyncIcon /></IconButton>
                          </Link>
                        </EditTooltip>
                      </li>
                    </ul>
                    <Button className='btn-addtocart' onClick={() => addToCart(item)}>
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                  <Link to={'/product/' + item._id}>
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className='product-img'
                      style={{ height: '270', width: '270' }}
                    />
                  </Link>
                </div>
                <DivProInfo className='mt-2'>
                  <h3 className='product-name dois-font'>{item.name}</h3>
                  <div className='product-rating' style={{ display: 'flex' }}>
                    <Rating name="read-only"
                      value={item.comment.items.reduce((total, next) => total + next.star, 0) / item.comment.total}
                      readOnly
                      size='small'
                      precision={0.5}
                    />
                    <Box ml={2} >{labels[(item.comment.items.reduce((total, next) => total + next.star, 0) / item.comment.total).toFixed(0)]}</Box>
                  </div>
                  <span className='product-price'>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                </DivProInfo>
              </div>
            ))}
          </div>
          <ModalInfo product={product} openModal={openModal} handleCloseModal={handleCloseModal} />
          <Pagination />
          <SnackBar
            openSnackbar={openSnackbar}
            closeSnackbar={closeSnackbar}
            vertical='top'
            horizontal='right'
            typeSnackbar={typeSnackbar}
            infoSnackbar={infoSnackbar}
          />
        </>}
    </>
  )
}
function Hearticon(props) {
  return (
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={HeartIcon} />
    </SvgIcon>
  )
}
function Searchicon(props) {
  return (
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={SearchIcon} />
    </SvgIcon>
  )
}