import React from 'react';

import "react-image-gallery/styles/scss/image-gallery.scss";
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Chip } from '@material-ui/core';
import ImageGallery from 'react-image-gallery';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '5px',
    [theme.breakpoints.up('xs')]: {
      width: '450px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '650px',
    },
    [theme.breakpoints.up('md')]: {
      width: '750px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '1030px',
    }
  },
}));

export default function ModalInfo(props){
  const classes = useStyles();
  const {open, closeModal, product} = props;
  return(
    <>
      <Modal
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          {product.images
          ? <div className='row product-info'>
              <div className='col-sm-5 product-img-gallery'>
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
              </div>
              <div className='col-sm-7'>
                <div className='product-detail'>
                  <h1 className='product-detail-title dois-font'>{product.name}</h1>
                  <span className='dois-font product-detail-price'>£{product.price}</span>
                  <hr/>
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
          :null
          }
          </div>
        </Fade>
      </Modal>
    </>
  )
}