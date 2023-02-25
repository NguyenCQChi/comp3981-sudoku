import SudokuGrid from '@src/components/SudokuGrid';
import React from 'react';
import MainButtons from '@src/components/MainButtons';

const OneSolution = (props: any) => {
  const 
    {size, 
    } = props;
  return(
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{padding: '15px', textAlign: 'center'}}>
          <strong style={{fontSize: '2rem', marginBottom: '2rem'}}>{size} x {size}</strong>
        </div>
        <MainButtons/>
      </div>
      <SudokuGrid
        size={size}/>
    </div>
  )
}

export default OneSolution;