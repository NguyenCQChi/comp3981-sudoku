import React from 'react';
import Button from '@mui/material/Button';

function MainButtons() {
  const buttonStyle = {
    '&.MuiButton-root': {
      backgroundColor: 'blue',
      color: 'white',
      marginBottom: '10px',
      fontSize: '1rem'
    }
  }
  return(
    <div style={
      {display: 'flex', 
      flexDirection: 'column', 
      flexWrap: 'wrap', 
      padding: '20px',
      alignItems: 'center'}
      }>
      <Button
        sx={buttonStyle}
        color='inherit'
        variant='outlined'
        >Create</Button>
      <Button
        sx={buttonStyle}
        color='inherit'
        variant='outlined'
        >Solve Brute Force</Button>
      <Button
        sx={buttonStyle}
        color='inherit'
        variant='outlined'
        >Solve CSP</Button>
      <Button
        sx={buttonStyle}
        color='inherit'
        variant='outlined'
        >Clear</Button>
      <Button
        sx={buttonStyle}
        color='inherit'
        variant='outlined'
        >Exit</Button>
    </div>
  )
};

export default MainButtons;