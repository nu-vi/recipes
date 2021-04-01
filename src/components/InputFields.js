import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const GreenTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#266150',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#266150',
    },
  },
})(TextField);



