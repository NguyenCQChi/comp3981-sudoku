/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useContext } from 'react';
import {Table, TableCell, TableRow, TableBody} from "@mui/material";
import { ResultContext } from '@src/contexts/ResultContext';
import { useTheme } from '@mui/material/styles';
// import { bruteForce } from '@src/utils/brute-force';
const SudokuGrid = (props: any) => {
  const {
    size,
    sudokuBoard,
    solved = false 
  } = props;
  const theme = useTheme();
  const [columnLine, setColumnLine] = useState(3)
  const [rowLine, setRowLine] = useState(3)
  const [gridBoard, setGridBoard] = useState<any>([[]]);
  const { 
    resultBF,
    resultCSP,
  } = useContext(ResultContext);

  useEffect(() => {
    setRowLine(Math.floor(Math.sqrt(size)))
    setColumnLine(Math.ceil(Math.sqrt(size)))
    setGridBoard(sudokuBoard)
    // console.log(sudokuBoard)
      // if (size == 12) {
      //   setRowLine(4)
      // } else if (size == 16) {
      //   setColumnLine(4)
      //   setRowLine(4)
      // } else if (size == 25) {
      //   setColumnLine(5)
      //   setRowLine(5)
      // } else if (size == 100) {
      //   setColumnLine(10)
      //   setRowLine(10)
      // }
    //   if(solved) {
    //     setGridBoard(resultBF)
    //   } else {
    //     if (size == 9) {
    //       // changeResultBF(solvedNineByNine)
    //       // changeResultCSP(solvedNineByNine)
    //       // createBlanks(solvedNineByNine)
    //     } else if (size == 12) {
    //       changeResultBF(solvedTwelveByTwelve)
    //       changeResultCSP(solvedTwelveByTwelve)
    //       createBlanks(solvedTwelveByTwelve)
    //     } else if (size == 16) {
    //       changeResultBF(solvedSixteenBySixteen)
    //       changeResultCSP(solvedSixteenBySixteen)
    //       createBlanks(solvedSixteenBySixteen)
    //     } else if (size == 25) {
    //       changeResultBF(solvedTwentyFiveByTwentyFive)
    //       changeResultCSP(solvedTwentyFiveByTwentyFive)
    //       createBlanks(solvedTwentyFiveByTwentyFive)
    //     } else if (size == 100) {
    //       changeResultCSP(solvedHundredByHundred)
    //       createBlanks(solvedHundredByHundred)
    //     }
    //   }
    // } else {
    
  }, [solved, resultBF, resultCSP])

  return (
    <Table
        sx={{
          '&.MuiTable-root': {
            width: '90%',
            height: '90%',
          }
        }}
      >
        <TableBody>
          {gridBoard.map((col: any, position: any) => (
            <TableRow
              sx={{
                border: `1px solid ${theme.palette.primary.dark}`,
                borderTop: position % rowLine == 0 && position != 0 ? `3px solid ${theme.palette.primary.dark}` : ''
              }}
              key={position}
            >
              {gridBoard[position].map((column: any, key: any) => (
                <TableCell 
                  key={key}
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    padding: '0',
                    borderLeft: key % columnLine == 0 && key != 0 ? `3px solid ${theme.palette.primary.dark}` : '',
                    width: size < 25 ? '50px' : '25px',
                    height: size < 25 ? '50px' : '25px',
                  }}
                >
                  <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: size <= 9 ? '20px' : '14px'}}>{column == 0 ? '': column}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default SudokuGrid;