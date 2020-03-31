import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar(props) {
  const { vertical, horizontal } = props
  return (
    <Snackbar open={props.openSnackbar} autoHideDuration={props.hideDuration || 6000}
      onClose={props.closeSnackbar} anchorOrigin={{ vertical, horizontal }}>
      <Alert onClose={props.closeSnackbar} severity={props.typeSnackbar}>
        {props.infoSnackbar}
      </Alert>
    </Snackbar>
  )
}

