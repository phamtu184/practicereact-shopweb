import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function VerifyEmail(){
  let { token } = useParams();
  useEffect(()=>{
    axios.post('/auth/activeemail', {token:token})
    .then(res=>{
      if(res.data==='active success'){
        localStorage.setItem("event", "ACTIVE_EMAIL");
        window.location.assign('/');
      }
      else{
        window.location.assign('/');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },[token]);
  const classes = useStyles();
  return(
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}