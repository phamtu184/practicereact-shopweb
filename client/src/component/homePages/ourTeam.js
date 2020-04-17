import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import ImgTeam1 from '../../image/background/team01.jpg';
import ImgTeam2 from '../../image/background/team02.jpg';
import ImgTeam3 from '../../image/background/team03.jpg';

const DivTitle = styled.div`
margin-top: 40px;
margin-bottom: 40px;
text-align: center;
h2{
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 60px;
  &:before{
    background-color: #1e88e5;
    background: #1e88e5;
    flex-grow: 1;
    -webkit-flex-grow: 1;
    height: 1px;
    content: "";
    margin-right: 35px;
    margin-top: 15px;
  }
  &:after{
    background-color: #1e88e5;
    background: #1e88e5;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    height: 1px;
    content: "";
    margin-left: 35px;
    margin-top: 15px;
  }
}
p{
  font-size: 30px;
  color: #1e88e5;
  font-weight: 700;
  text-transform: uppercase;
}
`
const DivTeamContent = styled.div`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
padding: 30px 0;
background-color: rgba(30,136,229,0.8);
transition:all 0.3s ease 0s;
h3{
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 7px;
  text-transform: uppercase;
  transition:all 0.3s ease 0s;
}
span{
  font-size: 17px;
  display: block;
  transition:all 0.3s ease 0s;
  text-transform: capitalize;
}
`
const DivOurTeam = styled.div`
text-align: center;
position: relative;
color: #fff;
&:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  transition:all 0.3s ease 0s;
  opacity: 0;
}
&:hover:before{
  opacity: 1;
}
img{
  width: 100%;
  height: auto;
}
&:hover{
  ${DivTeamContent}{
    bottom: 20%;
    h3{
      transform:translateY(30px);
      transition-delay:0.3s;
    }
    span{
      transform:translateY(-30px);
      transition-delay:0.3s;
    }
  }
}
`
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};
export default function OurTeam() {
  return (
    <>
      <DivTitle className='dois-font'>
        <h2 >Haustiere</h2>
        <p>Our Team</p>
      </DivTitle>
      <Slider {...settings} className='container'>
        <DivOurTeam>
          <img src={ImgTeam1} alt="team member1" />
          <DivTeamContent >
            <h3>Jelena</h3>
            <span>Service dog care</span>
          </DivTeamContent>
        </DivOurTeam>
        <DivOurTeam>
          <img src={ImgTeam2} alt="team member2" />
          <DivTeamContent >
            <h3>Ella</h3>
            <span>Full Grooming</span>
          </DivTeamContent>
        </DivOurTeam>
        <DivOurTeam>
          <img src={ImgTeam3} alt="team member3" />
          <DivTeamContent >
            <h3>Peter</h3>
            <span>Part Time</span>
          </DivTeamContent>
        </DivOurTeam>
      </Slider>
    </>
  )
}