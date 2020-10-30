import React from "react"
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


export default function ModalAlert(props) {
  
    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      
      props.open.setValue(false);
    };
  
    return (
        <Snackbar open={props.open.value} autoHideDuration={6000} onClose={handleSnackClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackClose} severity={props.snackData.severity}>
            {props.snackData.data}
          </MuiAlert>
        </Snackbar>
    );
  }