import React, { useState } from 'react'
import styled from 'styled-components';

import BusinessIcon from '../../image/jslogo/Business';
import PhoneIcon from '../../image/jslogo/Phone';
import EmailIcon from '../../image/jslogo/Email';

const DivContact = styled.div`
p{
  position: relative;
  padding: 10px 0 10px 45px;
  border-top: 1px dashed #e5e5e5;
  margin: 0;
  color: #555;
  line-height: 24px;
  svg{
    width: 30px;
    height: 30px;
    color: #1976d2;
    position: absolute;
    top: 10px;
    left: 0;
  }
}
`
const DivFollowUs = styled.div`
ul{
  li{
    line-height: 80px;
    width: 80px;
    font-size: 60px;
    text-align: center;
    font-family: 'Raleway';
    font-weight: 80;
    color: white;
    float: left;
    margin-right: 5px;
    list-style-type: none;
  }
}
`
const DivCopyright = styled.div`
padding: 25px;
text-align: center;
margin-top: 50px;
border-top: 0.5px solid #808488;
span{
  margin-right: 20px;
}
a{
  margin-right: 20px;
}
`
export default function ContactFooter() {
  const [isColor, setIsColor] = useState({
    f: true,
    t: true,
    g: true,
    l: true,
    y: true,
    content: ''
  });
  const mouseEnterHandle = (e, content) => {
    setIsColor({ ...!isColor, [e]: true, content })
  }
  const mouseLeaveHandle = () => {
    setIsColor({
      f: true,
      t: true,
      g: true,
      l: true,
      y: true,
      content: ''
    })
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <DivContact>
            <h2 className='title18 dosis-font text-uppercase font-bold'>Contact</h2>
            <p><BusinessIcon />90/24 Tôn Đức Thắng, Quận 7, TPHCM</p>
            <p><PhoneIcon />
              Mobile: <b>01678 311 160</b>
              <br></br>
              Telephone: <b>0351 365 765</b>
            </p>
            <p>
              <EmailIcon />
              481ntwayd@gmail.com
              <br></br>
              110117064@gmail.com
            </p>
          </DivContact>
        </div>
        <div className='col-md-6'>
          <DivFollowUs>
            <h2 className='title18 dosis-font text-uppercase font-bold'>Theo dõi Chúng tôi tại {isColor.content}</h2>
            <ul>
              <a href='/#'>
                <li
                  style={{ backgroundColor: isColor.f ? '#43609c' : 'gray' }}
                  onMouseEnter={() => mouseEnterHandle('f', 'facebook')}
                  onMouseLeave={() => mouseLeaveHandle('f')}
                >
                  F
                </li>
              </a>
              <a href='/#'>
                <li
                  style={{ backgroundColor: isColor.t ? '#53a7e7' : 'gray' }}
                  onMouseEnter={() => mouseEnterHandle('t', 'twitter')}
                  onMouseLeave={() => mouseLeaveHandle('t')}
                >
                  T
                </li>
              </a>
              <a href='/#'>
                <li
                  style={{ backgroundColor: isColor.g ? '#d95232' : 'gray' }}
                  onMouseEnter={() => mouseEnterHandle('g', 'google')}
                  onMouseLeave={() => mouseLeaveHandle('g')}
                >
                  G
                </li>
              </a>
              <a href='/#'>
                <li
                  style={{ backgroundColor: isColor.l ? '#0274b3' : 'gray' }}
                  onMouseEnter={() => mouseEnterHandle('l', 'linkedin')}
                  onMouseLeave={() => mouseLeaveHandle('l')}
                >
                  L
                </li>
              </a>
              <a href='/#'>
                <li
                  style={{ backgroundColor: isColor.y ? '#ec282a' : 'gray' }}
                  onMouseEnter={() => mouseEnterHandle('y', 'youtube')}
                  onMouseLeave={() => mouseLeaveHandle('y')}
                >
                  Y
                </li>
              </a>
            </ul>
          </DivFollowUs>
        </div>
      </div>
      <DivCopyright>
        <span>Copyright © 2020</span>
        <a href='/#'>Terms of Use</a>
        <a href='/#'>Privacy Policy</a>
      </DivCopyright>
    </div>
  )
}