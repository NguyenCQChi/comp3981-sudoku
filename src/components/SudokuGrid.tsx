/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from 'react';
import {Table, TableCell, TableRow, TableBody} from "@mui/material";
import { ResultContext } from '@src/contexts/ResultContext';

const SudokuGrid = (props: any) => {
  const {
    size,
    gridNums,
    solved = false 
  } = props;
  const [columnLine, setColumnLine] = useState(3)
  const [rowLine, setRowLine] = useState(3)
  const [gridBoard, setGridBoard] = useState<any>([[]]);
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

  const solvedNineByNine = [
    [4,3,5,2,6,9,7,8,1],
    [6,8,2,5,7,1,4,9,3],
    [1,9,7,8,3,4,5,6,2],
    [8,2,6,1,9,5,3,4,7],
    [3,7,4,6,8,2,9,1,5],
    [9,5,1,7,4,3,6,2,8],
    [5,1,9,3,2,6,8,7,4],
    [2,4,8,9,5,7,1,3,6],
    [7,6,3,4,1,8,2,5,9]
  ]

  const solvedTwelveByTwelve = [
    [7,10,5,4,8,12,3,9,1,6,11,2],
    [2,3,1,11,4,6,5,10,12,8,7,9],
    [8,12,9,6,11,1,2,7,10,3,5,4],
    [4,2,11,7,6,8,1,5,3,10,9,12],
    [1,9,8,12,10,7,11,3,6,2,4,5],
    [3,6,10,5,9,4,12,2,11,7,8,1],
    [5,7,12,2,3,9,6,11,4,1,10,8],
    [10,8,3,1,5,2,4,12,7,9,6,11],
    [6,11,4,9,1,10,7,8,2,5,12,3],
    [11,1,7,3,12,5,8,6,9,4,2,10],
    [9,4,2,8,7,11,10,1,5,12,3,6],
    [12,5,6,10,2,3,9,4,8,11,1,7]
  ]
  const solvedSixteenBySixteen = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    [9,10,11,12,1,2,3,4,13,14,15,16,5,6,7,8],
    [5,6,1,7,8,13,14,15,16,2,3,4,9,10,11,12],
    [13,14,15,16,9,10,11,12,5,6,7,8,1,2,3,4],
    [3,1,4,2,7,5,8,6,11,9,14,10,15,12,16,13],
    [11,9,14,10,3,1,4,2,15,12,16,13,7,5,8,6],
    [7,5,8,6,15,12,16,13,3,1,4,2,11,9,14,10],
    [15,12,16,13,11,9,14,10,7,5,8,6,3,1,4,2],
    [2,4,1,3,6,8,5,7,10,15,9,11,12,16,13,14],
    [10,15,9,11,2,4,1,3,12,16,13,14,6,8,5,7],
    [6,8,5,7,12,16,13,14,2,4,1,3,10,15,9,11],
    [12,16,13,14,10,15,9,11,6,8,5,7,2,4,1,3],
    [4,3,2,1,8,7,6,5,14,11,10,9,16,13,12,15],
    [14,11,10,9,4,3,2,1,16,13,12,15,8,7,6,5],
    [8,7,6,5,16,13,12,15,4,3,2,1,14,11,10,9],
    [16,13,12,15,14,11,10,9,8,7,6,5,4,3,2,1]
  ]
  const solvedTwentyFiveByTwentyFive = [
    [25,4,11,7,8,14,24,2,12,6,22,17,10,19,5,21,18,3,9,16,20,1,23,15,13],
    [13,20,17,10,2,3,9,8,4,7,24,15,12,14,21,6,1,5,25,23,11,22,16,19,18],
    [21,22,5,15,6,17,1,16,25,23,13,18,9,2,11,7,20,12,4,19,3,14,24,8,10],
    [24,12,1,3,16,18,20,13,5,19,7,4,25,8,23,14,10,11,15,22,21,6,2,9,17],
    [9,18,14,19,23,10,22,11,15,21,16,20,3,1,6,2,13,8,17,24,4,25,7,5,12],
    [16,24,15,8,22,4,13,20,9,12,14,21,23,6,19,11,25,2,7,18,5,10,1,17,3],
    [7,1,10,23,11,25,16,6,19,14,4,3,5,24,13,17,12,21,22,20,2,8,15,18,9],
    [6,21,3,9,17,1,18,22,7,15,25,8,2,12,10,23,24,19,5,13,14,11,20,4,16],
    [12,25,20,14,19,11,10,5,3,2,1,7,18,17,16,9,15,4,8,6,24,13,22,23,21],
    [4,5,2,18,13,8,21,17,23,24,20,22,15,11,9,3,14,1,16,10,12,7,6,25,19],
    [20,14,8,22,25,13,12,10,1,18,21,9,24,5,4,19,23,6,11,17,15,2,3,16,7],
    [19,7,4,12,3,24,25,15,11,8,2,23,1,13,14,18,22,16,20,5,10,17,9,21,6],
    [5,23,16,17,15,9,6,19,21,22,8,10,20,3,7,4,2,25,24,12,13,18,11,14,1],
    [2,10,24,11,1,23,3,7,20,5,6,16,17,22,18,15,21,9,13,14,25,19,8,12,4],
    [18,6,13,21,9,2,17,4,14,16,12,11,19,25,15,8,3,7,10,1,22,20,5,24,23],
    [15,11,19,20,18,16,7,14,2,25,10,13,8,9,22,12,5,17,6,4,1,23,21,3,24],
    [23,16,22,6,12,21,11,24,10,13,15,1,4,18,17,20,9,14,2,3,19,5,25,7,8],
    [1,9,25,4,5,20,15,23,18,3,11,24,7,16,2,22,8,10,19,21,17,12,13,6,14],
    [8,13,7,24,10,22,19,12,6,17,3,5,14,21,20,25,16,23,1,15,18,9,4,11,2],
    [17,3,21,2,14,5,4,9,8,1,19,12,6,23,25,24,11,13,18,7,16,15,10,20,22],
    [11,15,6,5,24,19,23,1,22,4,18,2,16,7,12,13,17,20,21,8,9,3,14,10,25],
    [3,8,23,13,7,12,2,18,16,10,5,25,21,20,24,1,19,15,14,9,6,4,17,22,11],
    [22,19,9,16,21,7,14,25,17,20,23,6,11,15,1,10,4,18,3,2,8,24,12,13,5],
    [14,2,12,25,4,15,8,21,13,9,17,19,22,10,3,5,6,24,23,11,7,16,18,1,20],
    [10,17,18,1,20,6,5,3,24,11,9,14,13,4,8,16,7,22,12,25,23,21,19,2,15]
  ]
  const solvedHundredByHundred = []

  // removes 25% of the numbers-
  function createBlanks(gridBoard: any) {
    var unsolvedNineByNine = structuredClone(gridBoard)
    let numTilesToRemove = Math.floor((size * size) * 0.75)
    let removedCells: any = []

    while (numTilesToRemove > 0) {
      let row = Math.floor(Math.random() * (size))
      let col = Math.floor(Math.random() * (size))
      if (!(removedCells.includes(`${row},${col}`))) { 
        unsolvedNineByNine[row][col] = 0
        removedCells.push(`${row},${col}`)
        numTilesToRemove--;
      } 
    }
    setGridBoard(unsolvedNineByNine)
  }

  useEffect(() => {
    if (gridNums == undefined || gridNums.length == 0) {
      if (size == 12) {
        setRowLine(4)
      } else if (size == 16) {
        setColumnLine(4)
        setRowLine(4)
      } else if (size == 25) {
        setColumnLine(5)
        setRowLine(5)
      } else if (size == 100) {
        setColumnLine(10)
        setRowLine(10)
      }
      if(solved) {
        setGridBoard(resultBF)
      } else {
        if (size == 9) {
          changeResultBF(solvedNineByNine)
          changeResultCSP(solvedNineByNine)
          createBlanks(solvedNineByNine)
        } else if (size == 12) {
          changeResultBF(solvedTwelveByTwelve)
          changeResultCSP(solvedTwelveByTwelve)
          createBlanks(solvedTwelveByTwelve)
        } else if (size == 16) {
          changeResultBF(solvedSixteenBySixteen)
          changeResultCSP(solvedSixteenBySixteen)
          createBlanks(solvedSixteenBySixteen)
        } else if (size == 25) {
          changeResultBF(solvedTwentyFiveByTwentyFive)
          changeResultCSP(solvedTwentyFiveByTwentyFive)
          createBlanks(solvedTwentyFiveByTwentyFive)
        } else if (size == 100) {
          // changeResultCSP(solvedHundredByHundred)
          // createBlanks(solvedHundredByHundred)
        }
      }
    } else {
      setGridBoard(gridNums)
    }
  }, [solved])

  return (
    <Table
        sx={{
          '&.MuiTable-root': {
            width: 'auto',
            height: '100%'
          }
        }}
      >
        <TableBody>
          {gridBoard.map((col: any, position: any) => (
            <TableRow
            {...(position % rowLine == 0 && position != 0) ? 
              
              {sx:{
                '&.MuiTableRow-root': {
                  border: '1px solid black',
                  borderTop: '3px solid black',
                }
              }
            } : 
            {sx: {
              '&.MuiTableCell-root': {
                border: '1px solid black',
              }
            }}
            }
              key={col.field}
            >
              {gridBoard[position].map((column: any, key: any) => (
                <TableCell 
                  
                  {...(key % columnLine == 0 && key != 0) ? 
                    {sx:{
                      '&.MuiTableCell-root': {
                        border: '1px solid black',
                        borderLeft: '3px solid black',
                        padding: '0'
                        // maxWidth: '20px',
                        // maxHeight: '20px'

                      }
                    }
                  } : 
                  {sx: {
                    '&.MuiTableCell-root': {
                      border: '1px solid black',
                      padding: '0'
                    }
                  }}
                  }
                >
                  <div 
                  style={{width: '35px', height: '25px', textAlign: 'center'}}
                  >{column == 0 ? '': column}</div>
                  </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default SudokuGrid;