import { SudokuGrid, MainButton } from '@src/components';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';

const TwoSolutions = ({size}: {size: String}) => {
  const { 
    resultBF, 
    resultCSP, 
    initialBoard,
    timeBF, 
    timeCSP, 
    statusBF, 
    statusCSP,
    changeResultBF,
    changeResultCSP,
    changeStatusBF,
    changeStatusCSP
  } = useContext(ResultContext);
  const [sizeState, setSizeState] = useState<boolean>();
  const [BFBoard, setBFBoard] = useState<string[][]>(resultBF.length > 0 ? resultBF : initialBoard);
  const [CSPBoard, setCSPBoard] = useState<string[][]>(resultCSP.length > 0 ? resultCSP : initialBoard);
  const theme = useTheme();

  useEffect(() => {
    if(size == "9" || size == "25" || size == "12") {
      setSizeState(true)
    } else if(size == "16") {
      setSizeState(false)
    }
  }, [size])

  useEffect(() => {
    console.log("initial board")
    console.log(initialBoard)
  }, [initialBoard])

  useEffect(() => {
    console.log(resultBF)
    if(resultBF.length > 0) {
      setBFBoard(resultBF)
    } else {
      setBFBoard(initialBoard)
      console.log("initial board")
      console.log(initialBoard)
    }
  }, [resultBF])

  useEffect(() => {
    console.log(resultCSP)
    if(resultCSP.length > 0) {
      setCSPBoard(resultCSP)
    } else {
      setCSPBoard(initialBoard)
      console.log("initial board")
      console.log(initialBoard)
    }
  }, [resultCSP])

  const handleClear = () =>{
    changeResultBF([])
    changeResultCSP([])
    changeStatusBF("Cannot solve BF!")
    changeStatusCSP("Cannot solve CSP!")
  }

  return(
    <div style={{background: `linear-gradient(135deg, white, ${theme.palette.secondary.light} 50%, white)`, height: sizeState ? '100vh' : 'wrapContent'}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: '100%', alignItems: 'center'}}>
        <div style={{height: sizeState ? '80%' : '95%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SudokuGrid size={size} solved={resultBF.length > 0} sudokuBoard={BFBoard}/>
          <div>
              <p>{statusBF}</p>
              <p>Time spent: {timeBF}</p>
          </div>
        </div>

        <div style={{width: '15%', display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <div style={{padding: '15px', textAlign: 'center'}}>
              <p style={{fontSize: '2rem', marginBottom: '2rem', fontWeight: 700, color: theme.palette.primary.dark}}>{size} x {size}</p>
          </div>
          <MainButton title="Create" option={false} disable={true} />
          <MainButton title='Solve Brute Force' option={false} disable={true}/>
          <MainButton title ='Solve CSP' option={false} disable={true}/>
          <Link href='/'>
            <a style={{textDecoration: 'none'}}>
              <MainButton title='Clear' option={false} handleOnClick={handleClear}/>
            </a>
          </Link>
          <Link href='/exit'>
            <a style={{textDecoration: 'none', width: "100%"}}>
              <MainButton title='Exit' option={false}/>
            </a>
        </Link>
        </div>
        <div style={{height: sizeState ? '80%' : '95%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SudokuGrid size={size} solved={resultCSP.length > 0} sudokuBoard={CSPBoard}/>
          <div>
            <p>{statusCSP}</p>
            <p>Time spent: {timeCSP}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TwoSolutions;