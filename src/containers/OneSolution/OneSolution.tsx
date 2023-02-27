import SudokuGrid from '@src/components/SudokuGrid';
import React, { useState, useContext, useEffect } from 'react';
import MainButton from '@src/components/MainButton';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';

const OneSolution = (props: any) => {
  const {
    size } = props;
  const [openSolveBF, setOpenSolveBF] = useState(false)
  const [openSolveCSP, setOpenSolveCSP] = useState(false)
  const path = `/twoSolutions/${size}`
  const { 
    changeResultBF, 
    changeResultCSP,
    changeTimeBF, 
    changeTimeCSP, 
    resultBF, 
    resultCSP, 
    timeBF, 
    timeCSP,
    initialBoard } = useContext(ResultContext);

  const handleSolveBF = () => {
    setOpenSolveBF(true)
    changeResultBF([1,2,3])
    changeTimeBF('100ms')
    if (openSolveCSP) {
      changeResultCSP([4,5,6])
    }
  }

  const handleSolveCSP = () => {
    setOpenSolveCSP(true)
    changeResultCSP([4,5,6])
    changeTimeCSP('20ms')
    if (openSolveBF) {
      changeResultBF([1,2,3])
    }
  }

  return(
    <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{padding: '15px', textAlign: 'center'}}>
          <strong style={{fontSize: '2rem', marginBottom: '2rem'}}>{size} x {size}</strong>
        </div>
        <MainButton title="Create" option={false} disable={true} />
        {openSolveCSP ? (
          size == 100 ? (
            <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={true}/>
          ) : (
            <Link href={path}>
              <a>
                <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={openSolveBF}/>
              </a>
          </Link>
          )
        ) : (
          <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={openSolveBF || size == 100}/>
        )}
        
        {openSolveBF ? (
            <Link href={path}>
              <a><MainButton title ='Solve CSP' handleOnClick={handleSolveCSP} option={false} disable={openSolveCSP}/></a>
            </Link>
          ) : (
            <MainButton title ='Solve CSP' handleOnClick={handleSolveCSP} option={false} disable={openSolveCSP}/>
          )
        }
        <Link href='/'>
          <a style={{textDecoration: 'none'}}>
            <MainButton title='Clear' option={false} disable={true}/>
          </a>
        </Link>
        
        
        <MainButton title='Exit' option={false}/>
      </div>
      <div>
        <SudokuGrid
          size={size}
          gridNums={initialBoard}
          />
        {openSolveBF && !openSolveCSP && 
          <div>
            <p>Solved Brute Force!</p>
            <p>Time spent: {timeBF}</p>
          </div>
        }
        {openSolveCSP && !openSolveBF &&
          <div>
            <p>Solved CSP!</p>
            <p>Time spent: {timeCSP}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default OneSolution;