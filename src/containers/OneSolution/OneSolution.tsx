import SudokuGrid from '@src/components/SudokuGrid';
import React, { useState, useContext, useEffect } from 'react';
import MainButton from '@src/components/MainButton';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';
import { stackBruteForce } from '@src/utils/brute-force';
import { CircularProgress } from '@mui/material';
import { CSP } from '@src/utils/csp';

const OneSolution = (props: any) => {
  const {
    size } = props;
  const theme = useTheme();
  const { 
    changeTimeBF, 
    changeTimeCSP, 
    timeBF, 
    timeCSP,
    changeResultBF,
    changeResultCSP,
    initialBoard } = useContext(ResultContext);
  const [openSolveBF, setOpenSolveBF] = useState(false)
  const [openSolveCSP, setOpenSolveCSP] = useState(false)
  const [gridBoard, setGridBoard] = useState(initialBoard)
  const [loading, setLoading] = useState(false)
  const path = `/twoSolutions/${size}`

  const handleSolveBF = () => {
    // setLoading(true)
    let startTime = performance.now()
    // console.log("start " + startTime)
    // bruteForce(gridBoard)
    stackBruteForce(gridBoard)
    let endTime = performance.now()
    // console.log("end " + endTime)
    let solveBFTime = endTime - startTime
    console.log(solveBFTime)
    changeTimeBF(`${solveBFTime.toFixed(2)}ms`)
    // if (solveBFTime > 1000) {
    //   clearTimeout(timerId)
    // }
    // setLoading(false)
    // changeTimeBF(`${solveBFTime.toFixed(2)}ms`)
    
    setOpenSolveBF(true)
    changeResultBF(gridBoard)
    // setGridBoard(gridBoard)
  }

  const handleSolveCSP = () => {
    let startTime = performance.now()
    CSP(gridBoard)
    let endTime = performance.now()
    let solveCSPTime = endTime - startTime
    changeTimeCSP(`${solveCSPTime.toFixed(2)}ms`)
    setOpenSolveCSP(true)
    changeResultCSP(gridBoard)
  }

  useEffect(() => {
    setGridBoard(initialBoard)
    // console.log(initialBoard)
    if(size == 100) {
      // @ts-ignore 
      const initialValue = document.body.style.zoom;

      // @ts-ignore 
      document.body.style.zoom = "50%";

      return () => {
        // @ts-ignore 
        document.body.style.zoom = initialValue
      }
    }
  }, [])

  return(
    <div style={{background: `linear-gradient(135deg, white, ${theme.palette.secondary.light} 50%, white)`, height: size == 100 ? 'wrapContent' : '100vh', width: size == 100 ? 'wrapContent' : '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px'}}>
      <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', height: '100%', padding: '20px'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '25%'}}>
          <div style={{padding: '15px', textAlign: 'center'}}>
            <p style={{fontSize: '2rem', marginBottom: '2rem', fontWeight: 700, color: theme.palette.primary.dark}}>{size} x {size}</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', width: size == 100 ? '55%' : '75%', gap: '8px'}}>
            <MainButton title="Create" option={false} disable={true} />
            {openSolveCSP ? (
              size == 100 ? (
                <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={true}/>
              ) : (
                <Link href={path}>
                  <a style={{textDecoration: 'none'}}>
                    <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={openSolveBF}/>
                  </a>
              </Link>
              )
            ) : (
              <MainButton title='Solve Brute Force' handleOnClick={handleSolveBF} option={false} disable={openSolveBF || size == 100}/>
            )}
            
            {openSolveBF ? (
                <Link href={path}>
                  <a style={{textDecoration: 'none'}}><MainButton title ='Solve CSP' handleOnClick={handleSolveCSP} option={false} disable={openSolveCSP}/></a>
                </Link>
              ) : (
                <MainButton title ='Solve CSP' handleOnClick={handleSolveCSP} option={false} disable={openSolveCSP}/>
              )
            }
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
        </div>
        <div style={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SudokuGrid
            size={size}
            sudokuBoard={gridBoard}
            solved={openSolveBF || openSolveCSP}
            />
            {loading && <CircularProgress />}
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
    </div>
  )
}

export default OneSolution;