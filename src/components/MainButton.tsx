import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MainButton = (props: any) => {
  const {
    title,
    handleOnClick,
    option, 
    disable = false,
    sx
  } = props

  const theme = useTheme()

  return(
      <Button
        sx={{
          backgroundColor: disable ? theme.palette.secondary.dark : theme.palette.primary.main,
          color: "white",
          fontSize: option ? '1rem' : '1.5rem',
          padding: '8px',
          width: '100%',
          textTransform: 'none',
          border: 'none',
          boxShadow: disable ? `0px 5px 5px ${theme.palette.secondary.dark}` : `0px 5px 5px ${theme.palette.primary.dark}`,
          ':hover': {
            backgroundColor: disable ? theme.palette.secondary.dark : theme.palette.primary.light,
            transitionProperty: 'transform',
            transform: 'translateY(-2px) translateX(2px)',
            transitionDuration: '300ms',
            boxShadow: disable ? `0px 5px 5px ${theme.palette.secondary.dark}` : `0px 5px 5px ${theme.palette.primary.main}`
          },
          '&.Mui-disabled': {
            color: 'white' 
          },
          ...sx
        }}
        color='inherit'
        variant='outlined'
        onClick={handleOnClick}
        disabled={disable}
        >{title}</Button>
  )
};

export default MainButton;