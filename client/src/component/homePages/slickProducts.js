import React, { useState, useContext } from 'react'
import styled from 'styled-components';

import Slider from "react-slick";
import { withStyles } from '@material-ui/core/styles';
import { IconButton, SvgIcon, Tooltip, Button } from '@material-ui/core';
import ModalInfo from '../products/modalInfo';
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/cart';
import SnackBar from '../snackBar/snackBar';
import { SearchIcon, HeartIcon } from '../../image/jslogo/svlogo';
import SyncIcon from '../../image/jslogo/Sync';
const DivItemPro = styled.div`
display: flex;
align-items: flex-start;
display: -webkit-flex;
-webkit-align-items: flex-start;
margin-bottom: 30px;
`
const DivProExtraLink = styled.div`
position: absolute;
height: 100px;
top: 0;
bottom: 0;
margin: auto;
left: 0;
right: 0;
z-index: 12;
transition: all 0.3s ease-out 0s;
-webkit-transition: all 0.3s ease-out 0s;
text-align: center;
ul{
  margin: 0 0 1em;
  padding: 0;
  list-style: none outside;
  clear: both;
  display: flex;
  justify-content: space-evenly;
  li{
    display: inline-block;
    vertical-align: top;
    list-style: none outside;
    .MuiTooltip-arrow{
      color: #03a9f4;
    }
    button{
      color:#1e88e5;
      border: 2px solid #1e88e5;
      background-color: white;
      padding: 7px;
      svg{
        font-size: 18px;
      }
    }
    button:hover{
      color:white;
      background-color: #1e88e5;
    }
  }
}
button{
  transition: all 0.3s ease-out 0s;
  transform: scale(0);
  -webkit-transform: scale(0);
}
.btn-addtocart{
  border-radius: 5px;
  background-color: #1e88e5;
  span{
    color: white;
    font-weight: 550;
  }
}
.btn-addtocart:hover{
  background-color: #1565c0;
}
`
const ImgPro = styled.img`
display: block;
overflow: hidden;
transition: all 0.3s ease-out 0s;
-webkit-transition: all 0.3s ease-out 0s;
width: 100%;
max-width: 100%;
height: auto;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
position: relative;
`
const DivProThumb = styled.div`
overflow: hidden;
position: relative;
width: 53%;
&:hover{
  ${DivProExtraLink}{
    button{
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
  ${ImgPro}{
    filter: opacity(50%);
    transform: scale(1.2);
  }
}
`
const DivProInfo = styled.div`
width: 47%;
padding-left: 30px;
padding-top: 0;
position: relative;
`
const H3Title = styled.h3`
margin: 0 0 7px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
font-weight: 700;
font-size: 30px;
a{
  color: #333;
  transition: all 0.3s ease-out 0s;
  -webkit-transition: all 0.3s ease-out 0s;
  &:hover{
    color: #1e88e5;
  }
}
`
const DivProPrice = styled.div`
margin: 0 -2px 7px;
span{
  font-weight: 700;
  font-size: 18px;
  color: #1e88e5;
  margin: 0 2px;
  display: inline-block;
}
`
const DivExtraDesc = styled.div`
li{
  border-top: 1px dashed #e5e5e5;
  padding: 9px 0 7px;
  span{
    color: #999;
    text-transform: uppercase;
  }
  p{
    color: #555;
    margin: 0;
    line-height: 24px;
    text-transform: capitalize;
  }
}
`
const EditTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#03a9f4',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const settings = {
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 1,
  speed: 800,
  rows: 2,
  slidesPerRow: 2,
  autoplay: true,
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesPerRow: 1,
      }
    },
  ]
};
export default function SlickProducts(props) {
  const { products } = props;
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
    <div>
      <Slider {...settings}>
        {products.map((item, index) => (
          <div key={index}>
            <DivItemPro>
              <DivProThumb>
                <DivProExtraLink>
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
                </DivProExtraLink>
                <Link to={'/product/' + item._id}>
                  <ImgPro
                    src={item.images[0]}
                    alt={item.name}
                    style={{ height: '270', width: '270' }}
                  />
                </Link>
              </DivProThumb>
              <DivProInfo>
                <H3Title className='dois-font text-uppercase'>
                  <Link to={'/product/' + item._id}>{item.name}</Link>
                </H3Title>
                <DivProPrice>
                  <span>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(item.price)}</span>
                </DivProPrice>
                <DivExtraDesc>
                  <ul className='list-none'>
                    <li>
                      <span>Giống:</span>
                      <p>{item.breed}</p>
                    </li>
                    <li>
                      <span>kích thước:</span>
                      <p>{item.size}</p>
                    </li>
                    <li>
                      <span>Giới tính:</span>
                      <p>{item.gender}</p>
                    </li>
                    <li>
                      <span>Mô tả:</span>
                      <p>{item.description.slice(0, 20)}</p>
                    </li>
                  </ul>
                </DivExtraDesc>
              </DivProInfo>
            </DivItemPro>
          </div>
        ))}
      </Slider>
      <ModalInfo product={product} openModal={openModal} handleCloseModal={handleCloseModal} />
      <SnackBar
        openSnackbar={openSnackbar}
        closeSnackbar={closeSnackbar}
        vertical='top'
        horizontal='right'
        typeSnackbar={typeSnackbar}
        infoSnackbar={infoSnackbar}
      />
    </div>
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