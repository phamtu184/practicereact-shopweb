import React, { useState, useContext } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Box, IconButton, SvgIcon, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import WalkingLoader from './wakingLoader';
import Pagination from './pagination';
import ModalInfo from './modalInfo';
import { SearchIcon, HeartIcon, SyncIcon } from '../../image/svglogo/svlogo';
import { ProductContext } from './productContext';
import { CartContext } from '../../context/cart';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const EditTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#03a9f4',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

export default function ProductsList(){
  const [valueRating, setValueRating] = useState(4);
  const [hoverRating, setHoverRating] = useState(-1);
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState([]);

  const handleOpenModal = (product) => {
    setProduct(product)
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return(
    <>
      {loading? <WalkingLoader/>
      :<>
        <div className='product-list mt-3'>
          {products.map((product,index)=>(
            <div className='col-md-6 col-lg-4 mb-4' key={index}>
              <div className='product-thumb'>
                <div className='product-extra-link'>
                  <ul>
                    <li>
                      <EditTooltip title="Yêu thích" arrow placement="top"
                        PopperProps={{disablePortal: true}}
                      >
                        <IconButton ><Hearticon/></IconButton>
                      </EditTooltip>
                    </li>
                    <li>
                      <EditTooltip title="Thông tin" arrow placement="top"
                        PopperProps={{disablePortal: true}}
                      >
                        <IconButton onClick={()=>handleOpenModal(product)}><Searchicon/></IconButton>
                      </EditTooltip>
                    </li>
                    <li>
                      <EditTooltip title="Compare" arrow placement="top"
                        PopperProps={{disablePortal: true}}
                      >
                        <IconButton ><Syncicon/></IconButton>
                      </EditTooltip>
                    </li>
                  </ul>
                  <Button className='btn-addtocart' onClick={()=>addToCart(product._id)}>
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <img src={product.images[0]} alt={product.name} className='product-img' style={{height:'270', width:'270'}}/>
              </div>
              <div className='product-info mt-2'>
                <h3 className='product-name'>{product.name}</h3>
                <div className='product-rating'>
                  <Rating
                    name="hover-feedback"
                    size="small"
                    value={valueRating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValueRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHoverRating(newHover);
                    }}
                  />
                  {valueRating !== null && <Box ml={2}>{labels[hoverRating !== -1 ? hoverRating : valueRating]}</Box>}
                </div>
                <span className='product-price'>£{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        <ModalInfo open={openModal} closeModal={handleCloseModal} product={product}/>
        <Pagination/>
        <div style={{height:'200px'}}></div>
      </>}
    </>
  )
}
function Hearticon(props){
  return(
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={HeartIcon}/>
    </SvgIcon>
  )
}
function Searchicon(props){
  return(
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={SearchIcon}/>
    </SvgIcon>
  )
}
function Syncicon(props){
  return(
    <SvgIcon {...props} viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path d={SyncIcon}/>
    </SvgIcon>
  )
}