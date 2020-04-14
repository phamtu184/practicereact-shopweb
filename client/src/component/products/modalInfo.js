import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Fade, Modal, Backdrop } from '@material-ui/core';
import ProductInfo from './productInfo';

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

export default function ModalInfo(props) {
  const { product, openModal, handleCloseModal } = props;
  const classes = useStyles();
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <ProductInfo product={product} />
        </div>
      </Fade>
    </Modal>
  )
}