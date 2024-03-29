/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import {Table, TableCell, TableRow, TableBody} from "@mui/material";
import { useTheme } from '@mui/material/styles';
const SudokuGrid = (props: any) => {
  const {
    size,
    sudokuBoard,
    solved = false 
  } = props;
  const theme = useTheme();
  const [columnLine, setColumnLine] = useState(3)
  const [rowLine, setRowLine] = useState(3)

  useEffect(() => {
    setRowLine(Math.floor(Math.sqrt(size)))
    setColumnLine(Math.ceil(Math.sqrt(size)))
  }, [solved])

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
          {sudokuBoard.map((col: any, position: any) => (
            <TableRow
              sx={{
                border: `1px solid ${theme.palette.primary.dark}`,
                borderTop: position % rowLine == 0 && position != 0 ? `3px solid ${theme.palette.primary.dark}` : ''
              }}
              key={position}
            >
              {sudokuBoard[position].map((column: any, key: any) => (
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