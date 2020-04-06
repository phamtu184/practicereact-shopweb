import React, { useEffect, useState } from 'react';
import axiost from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UsersSetting() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiost.get('/product/products')
      .then((res) => setProducts(res.data))
  }, []);

  const deleteProduct = (product) => {
    const index = products.indexOf(product);
    axiost.delete('/product/product', { data: { _id: product._id } })
      .then(() => setProducts(
        [
          ...products.slice(0, index),
          ...products.slice(index + 1)
        ]
      ))
  }

  const classes = useStyles();
  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div className='row'>
        {products.map((product, index) => (
          <div className='col-md-3 mt-4' key={index}>
            <Card className={classes.root} >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={product.images[0]}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tên: {product.name}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Miêu tả: {product.description}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Giá: {product.price} đồng
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Kích cỡ: {product.size}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Loài: {product.type}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    Giới tính: {product.gender}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => deleteProduct(product)}>
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}