import React from 'react';
import { useTheme } from '@mui/material/styles';

function ExitModule() {
  const theme = useTheme();
  return (
    <div style={{height: '100vh', justifyContent: 'center', alignItems:'center', display: 'flex', background: `linear-gradient(135deg, white, ${theme.palette.secondary.light} 50%, white)`}}>
      <p style={{fontSize: '60px', fontWeight: 600, color: theme.palette.primary.dark}}>Thanks for playing!!!</p>
    </div>
  )
}

export default ExitModule;