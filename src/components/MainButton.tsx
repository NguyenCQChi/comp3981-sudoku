import React from 'react';
import { Button, } from '@mui/material';

const MainButton = (props: any) => {
  const {
    title,
    handleOnClick,
    option, 
    disable = false
  } = props

  return(
      <Button
        sx={{
          backgroundColor: disable ? "grey" : "blue",
          color: "white",
          fontSize: option ? '1rem' : '1.5rem',
          width: '100%',
          textTransform: 'none',
          ':hover': {
            
          }
        }}
        color='inherit'
        variant='outlined'
        onClick={handleOnClick}
        disabled={disable}
        >{title}</Button>
  )
};

export default MainButton;