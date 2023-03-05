import { SudokuGrid, MainButton } from '@src/components';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';

const TwoSolutions = ({size}: {size: String}) => {
  const { 
    resultBF, 
    resultCSP, 
    timeBF, 
    timeCSP } = useContext(ResultContext);
  const [sizeState, setSizeState] = useState<boolean>();
  const theme = useTheme();

  useEffect(() => {
    if(size == "9" || size == "25" || size == "12") {
      setSizeState(true)
    } else if(size == "16") {
      setSizeState(false)
    }
  }, [size])

  return(
    <div style={{background: `linear-gradient(135deg, white, ${theme.palette.secondary.light} 50%, white)`, height: sizeState ? '100vh' : 'wrapContent'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: '100%', alignItems: 'center'}}>
        <div style={{height: sizeState ? '80%' : '95%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SudokuGrid size={size} solved={resultBF.length > 0}/>
          <div>
              <p>Solved Brute Force!</p>
              <p>Time spent: {timeBF}</p>
          </div>
        </div>
        <div style={{width: '15%', display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <MainButton title="Create" option={false} disable={true} />
          <MainButton title='Solve Brute Force' option={false} disable={true}/>
          <MainButton title ='Solve CSP' option={false} disable={true}/>
          <Link href='/'>
            <a style={{textDecoration: 'none'}}>
              <MainButton title='Clear' option={false}/>
            </a>
          </Link>
          <Link href='/exit'>
            <a style={{textDecoration: 'none', width: "100%"}}>
              <MainButton title='Exit' option={false}/>
            </a>
        </Link>
        </div>
        <div style={{height: sizeState ? '80%' : '95%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SudokuGrid size={size} solved={resultCSP.length > 0}/>
          <div>
            <p>Solved CSP!</p>
            <p>Time spent: {timeCSP}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TwoSolutions;