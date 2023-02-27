import React from 'react';
import { Button, } from '@mui/material';

const MainButton = (props: any) => {
  const {
    title,
    handleOnClick,
    option, 
    disable = false
  } = props
  
  const homeButtonStyle = {
    '&.MuiButton-root': {
      backgroundColor: "blue",
      color: 'white',
      marginBottom: '10px',
      fontSize: '1.5rem',
      width: '100%'
    }
  }

  const optionButtonStyle = {
    '&.MuiButton-root': {
      //  ? backgroundColor: 'grey' : {backgroundColor: 'blue'}},
      backgroundColor: "blue",
      color: 'white',
      marginBottom: '10px',
      fontSize: '1rem',
      width: '100%'
    }
  }

  return(
      <Button
        // {...disable && {sx: {background: 'grey'}}}
        sx={option ? optionButtonStyle : homeButtonStyle}
        
        color='inherit'
        variant='outlined'
        onClick={handleOnClick}
        disabled={disable}
        >{title}</Button>
  )
};

export default MainButton;