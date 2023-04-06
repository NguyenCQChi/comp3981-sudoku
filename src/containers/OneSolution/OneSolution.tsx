import SudokuGrid from '@src/components/SudokuGrid';
import React, { useState, useContext, useEffect } from 'react';
import MainButton from '@src/components/MainButton';
import Link from 'next/link';
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

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
    statusBF, 
    statusCSP,
    changeStatusBF, 
    changeStatusCSP,
    initialBoard } = useContext(ResultContext);
  const [openSolveBF, setOpenSolveBF] = useState(false)
  const [openSolveCSP, setOpenSolveCSP] = useState(false)
  const [gridBoard, setGridBoard] = useState(initialBoard)
  const [loading, setLoading] = useState(false)
  const path = `/twoSolutions/${size}`

  async function fetchWithTimeout(resource: any, options: any) {
    const { timeout = 300000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const result = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    return result;
  }

  const handleSolveBF = async() => {
    setOpenSolveBF(true)
    setLoading(true)
    const payload = {
      value: initialBoard
    }
    var solveBFTime = 0
    var boardIsComplete = false;
    let i = 0;
    while (!boardIsComplete && i < 5) {
      i++
      let startTime = performance.now()
      try{
        const result = await fetchWithTimeout('/api/brute_force', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          timeout: 300000
        })
        const status = await result.status
        
        if(status == 200) {
          boardIsComplete = true
          changeStatusBF("Solved Brute Force!")
        } else {
          boardIsComplete = false
          changeStatusBF("Cannot solve Brute Force!")
        }
        const value = await result.json()
        setGridBoard(value.board)
        changeResultBF(value.board)
      } catch (error : any) {
        console.log(error.name == 'AbortError');
      }
      
      let endTime = performance.now()
      solveBFTime = (endTime - startTime)/1000   
      console.log(`Attempt ${i} in ${solveBFTime.toFixed(4)}s`)   
    }
    setLoading(false)
    changeTimeBF(`${solveBFTime.toFixed(4)}s`)
  }

  const handleSolveCSP = async() => {
    setOpenSolveCSP(true)
    setLoading(true)
    const payload = {
      value: initialBoard
    }
    var solveCSPTime = 0
    var boardIsComplete = false;
    let i = 0;
    while (!boardIsComplete && i < 10) {
      i++
      let startTime = performance.now()
      try {
        const result = await fetchWithTimeout('/api/csp', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          timeout: 300000
        })
        const status = await result.status
        if(status == 200) {
          boardIsComplete = true
          changeStatusCSP("Solved CSP!")
        } else {
          boardIsComplete = false
          changeStatusCSP("Cannot solve CSP!")
        }
        const value = await result.json()
        setGridBoard(value.board)
        changeResultCSP(value.board)
      } catch (error: any) {
        console.log(error.name == 'AbortError');
      }
      const endTime = performance.now()
      solveCSPTime = (endTime - startTime)/1000
      console.log(`Attempt ${i} in ${solveCSPTime.toFixed(4)}s`)
    }
    setLoading(false)
    changeTimeCSP(`${solveCSPTime.toFixed(4)}s`)
  }

  const handleClear = () => {
    changeResultBF([])
    changeResultCSP([])
    changeStatusBF("Cannot solve BF!")
    changeStatusCSP("Cannot solve CSP!")
  }

  useEffect(() => {
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
                <MainButton title='Clear' option={false} handleOnClick={handleClear}/>
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
            {loading && 
              <div style={{marginTop: '10px'}}>
                <CircularProgress />
              </div>
            }
          {openSolveBF && !openSolveCSP && !loading && 
            <div>
              <p>{statusBF}</p>
              <p>Time spent: {timeBF}</p>
            </div>
          }
          {openSolveCSP && !openSolveBF && !loading &&
            <div>
              <p>{statusCSP}</p>
              <p>Time spent: {timeCSP}</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OneSolution;