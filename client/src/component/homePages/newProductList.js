import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const MultiCarouselPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([{
      id: {
        $oid: "5e4f4f1efc13ae1f0a000008"
      },
      img: "http://dummyimage.com/145x176.png/dddddd/000000",
      title: "Dangerous Method, A",
      intro: "Obstruction of duodenum"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a000009"
      },
      img: "http://dummyimage.com/178x197.png/cc0000/ffffff",
      title: "The Monkey King",
      intro: "Other superficial bite of left little finger, sequela"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000a"
      },
      img: "http://dummyimage.com/144x163.bmp/dddddd/000000",
      title: "Boys Don't Cry (Chlopaki nie placza)",
      intro: "War op w thermal radn effect of nuclear weapon, civ, init"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000b"
      },
      img: "http://dummyimage.com/186x173.bmp/5fa2dd/ffffff",
      title: "Sense of History, A",
      intro: "Disp fx of nk of 1st MC bone, unsp hand, 7thK"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000c"
      },
      img: "http://dummyimage.com/150x196.png/ff4444/ffffff",
      title: "Resurrect Dead: The Mystery of the Toynbee Tiles",
      intro: "Contusion of right breast, initial encounter"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000d"
      },
      img: "http://dummyimage.com/196x191.bmp/cc0000/ffffff",
      title: "Summer by the River, A (Kuningasjätkä)",
      intro: "Struck by baseball, sequela"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000e"
      },
      img: "http://dummyimage.com/146x175.bmp/dddddd/000000",
      title: "Cross: The Arthur Blessitt Story, The",
      intro: "Pathological fracture in other disease, unsp ulna and radius"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000f"
      },
      img: "http://dummyimage.com/171x169.bmp/5fa2dd/ffffff",
      title: "Let Me In",
      intro: "Traum subdr hem w LOC w dth d/t oth cause bef reg consc,subs"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000c"
      },
      img: "http://dummyimage.com/150x196.png/ff4444/ffffff",
      title: "Resurrect Dead: The Mystery of the Toynbee Tiles",
      intro: "Contusion of right breast, initial encounter"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000d"
      },
      img: "http://dummyimage.com/196x191.bmp/cc0000/ffffff",
      title: "Summer by the River, A (Kuningasjätkä)",
      intro: "Struck by baseball, sequela"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000e"
      },
      img: "http://dummyimage.com/146x175.bmp/dddddd/000000",
      title: "Cross: The Arthur Blessitt Story, The",
      intro: "Pathological fracture in other disease, unsp ulna and radius"
    }, {
      id: {
        $oid: "5e4f4f1efc13ae1f0a00000f"
      },
      img: "http://dummyimage.com/171x169.bmp/5fa2dd/ffffff",
      title: "Let Me In",
      intro: "Traum subdr hem w LOC w dth d/t oth cause bef reg consc,subs"
    }
    ])
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='container'>
      <div>
        <h2> Responsive </h2>
        <Slider {...settings}>
          {products.map((product, index) => (
            <div className="px-2 py-2" key={index}>
              <Card className="w-100" style={{ height: '280px' }} >
                <CardActionArea >
                  <CardMedia
                    component="img"
                    alt={index}
                    height="140"
                    image={product.img}
                    title={product.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {products.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.intro}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                    </Button>
                  <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MultiCarouselPage;