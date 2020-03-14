import React, { useState, useEffect } from 'react';

import { Button, Box, IconButton, SvgIcon } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import SortTopBar from './sortTopBar';
import Image from '../../image/products/pet_store_dog_12-150x150.jpg'
import { SearchIcon, HeartIcon, SyncIcon } from '../../image/svglogo/svlogo';

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

export default function ProductsList(){
  const [products, setProducts] = useState([]);
  const [valueRating, setValueRating] = useState(2);
  const [hoverRating, setHoverRating] = useState(-1);
  useEffect(()=>{
    setProducts(Products)
  },[])

  return(
    <div className='ml-4 mt-4'>
      <SortTopBar/>
      <div className='product-list mt-4'>

        <div className='col-md-4 col-sm-6 mb-4'>
          <div className='product-thumb'>
            <div className='product-extra-link'>
              <ul>
                <li>
                  <IconButton ><Hearticon/></IconButton>
                </li>
                <li>
                  <IconButton ><Searchicon/></IconButton>
                </li>
                <li>
                  <IconButton ><Syncicon/></IconButton>
                </li>
              </ul>
              <Button className='btn-addtocart'>
                Thêm vào giỏ hàng
              </Button>
            </div>
            <img src={Image} alt='1' className='product-img' style={{height:'270', width:'270'}}/>
          </div>
          <div className='product-info mt-2'>
            <h3 className='product-name'>sađas</h3>
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
            <p className='product-desc'>sađas</p>
            <span className='product-price'>£45654</span>
          </div>
        </div>

      </div>
    </div>
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

const Products = [{
  "id": 1,
  "name": "Jeanette",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$0.14",
  "size": "Indigo",
  "type": "Elise",
  "gender": "Female",
  "images": "http://dummyimage.com/223x115.jpg/dddddd/000000"
}, {
  "id": 2,
  "name": "Loleta",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$1.95",
  "size": "Fuscia",
  "type": "Express 1500",
  "gender": "Female",
  "images": "http://dummyimage.com/196x136.bmp/5fa2dd/ffffff"
}, {
  "id": 3,
  "name": "Viv",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$1.93",
  "size": "Crimson",
  "type": "Mustang",
  "gender": "Female",
  "images": "http://dummyimage.com/137x161.bmp/ff4444/ffffff"
}, {
  "id": 4,
  "name": "Gaile",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$9.14",
  "size": "Aquamarine",
  "type": "Marquis",
  "gender": "Male",
  "images": "http://dummyimage.com/107x154.bmp/5fa2dd/ffffff"
}, {
  "id": 5,
  "name": "Becka",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$5.44",
  "size": "Purple",
  "type": "Mazda3",
  "gender": "Female",
  "images": "http://dummyimage.com/119x222.png/ff4444/ffffff"
}, {
  "id": 6,
  "name": "Ferdy",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$8.81",
  "size": "Teal",
  "type": "1500",
  "gender": "Male",
  "images": "http://dummyimage.com/137x158.png/5fa2dd/ffffff"
}, {
  "id": 7,
  "name": "Georgetta",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$3.92",
  "size": "Yellow",
  "type": "NX",
  "gender": "Female",
  "images": "http://dummyimage.com/220x149.png/dddddd/000000"
}, {
  "id": 8,
  "name": "Elroy",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$4.42",
  "size": "Turquoise",
  "type": "Grand Cherokee",
  "gender": "Male",
  "images": "http://dummyimage.com/224x137.png/ff4444/ffffff"
}, {
  "id": 9,
  "name": "Brig",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$3.90",
  "size": "Green",
  "type": "Camaro",
  "gender": "Male",
  "images": "http://dummyimage.com/233x133.bmp/dddddd/000000"
}, {
  "id": 10,
  "name": "Ofilia",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$7.07",
  "size": "Pink",
  "type": "300",
  "gender": "Female",
  "images": "http://dummyimage.com/121x177.png/cc0000/ffffff"
}, {
  "id": 11,
  "name": "Bronson",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$2.63",
  "size": "Orange",
  "type": "Suburban 2500",
  "gender": "Male",
  "images": "http://dummyimage.com/146x222.bmp/cc0000/ffffff"
}, {
  "id": 12,
  "name": "Krishnah",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$3.53",
  "size": "Aquamarine",
  "type": "Quest",
  "gender": "Male",
  "images": "http://dummyimage.com/121x240.png/cc0000/ffffff"
}, {
  "id": 13,
  "name": "Clerc",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$2.23",
  "size": "Puce",
  "type": "TL",
  "gender": "Male",
  "images": "http://dummyimage.com/189x143.bmp/5fa2dd/ffffff"
}, {
  "id": 14,
  "name": "Giacinta",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$9.10",
  "size": "Violet",
  "type": "M",
  "gender": "Female",
  "images": "http://dummyimage.com/221x222.jpg/ff4444/ffffff"
}, {
  "id": 15,
  "name": "Serene",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$3.23",
  "size": "Green",
  "type": "Voyager",
  "gender": "Female",
  "images": "http://dummyimage.com/194x195.bmp/5fa2dd/ffffff"
}, {
  "id": 16,
  "name": "Lothaire",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$5.85",
  "size": "Maroon",
  "type": "Sable",
  "gender": "Male",
  "images": "http://dummyimage.com/172x185.png/cc0000/ffffff"
}, {
  "id": 17,
  "name": "Brendis",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$8.74",
  "size": "Orange",
  "type": "Diablo",
  "gender": "Male",
  "images": "http://dummyimage.com/186x151.png/ff4444/ffffff"
}, {
  "id": 18,
  "name": "Car",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$6.26",
  "size": "Aquamarine",
  "type": "B-Series",
  "gender": "Male",
  "images": "http://dummyimage.com/143x250.png/cc0000/ffffff"
}, {
  "id": 19,
  "name": "Leigh",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$2.71",
  "size": "Mauv",
  "type": "Tempest",
  "gender": "Female",
  "images": "http://dummyimage.com/106x172.bmp/5fa2dd/ffffff"
}, {
  "id": 20,
  "name": "Worthington",
  "description": "asdsadsadsadsadsadsadsadsadsadsadsadasdsad",
  "price": "$2.64",
  "size": "Maroon",
  "type": "Escort",
  "gender": "Male",
  "images": "http://dummyimage.com/104x223.jpg/cc0000/ffffff"
}]