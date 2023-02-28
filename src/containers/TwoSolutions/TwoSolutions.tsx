import { SudokuGrid, MainButton } from '@src/components';
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';

const TwoSolutions = ({size}: {size: String}) => {
  const { 
    resultBF, 
    resultCSP, 
    timeBF, 
    timeCSP } = useContext(ResultContext);

  return(
    <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
      <div>
        <SudokuGrid size={size} solved={resultBF.length > 0}/>
        <div>
            <p>Solved Brute Force!</p>
            <p>Time spent: {timeBF}</p>
        </div>
      </div>
      <div style={{width: '20%'}}>
        <MainButton title="Create" option={false} />
        <MainButton title='Solve Brute Force' option={false} disable={true}/>
        <MainButton title ='Solve CSP' option={false} disable={true}/>
        <Link href='/'>
          <a style={{textDecoration: 'none'}}>
            <MainButton title='Clear' option={false} disable={true}/>
          </a>
        </Link>
        
        <MainButton title='Exit' option={false}/>
      </div>
      <div>
      <SudokuGrid size={size} solved={resultCSP.length > 0}/>
        <div>
            <p>Solved CSP!</p>
            <p>Time spent: {timeCSP}</p>
        </div>
      </div>
    </div>

  )
}

export default TwoSolutions;