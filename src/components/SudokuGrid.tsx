/* eslint-disable react/jsx-key */
import {Table, TableCell, TableRow, TableBody} from "@mui/material";
import { bgcolor, border, borderBottom, borderRadius, borderRight, borders } from "@mui/system";
function SudokuGrid() {
  const columns: any[] = [
    { field: 'Column 1', headerName: '1', width: 50},
    { field: 'Column 2', headerName: '2', width: 50},
    { field: 'Column 3', headerName: '3', width: 50},
    { field: 'Column 4', headerName: '4', width: 50},
    { field: 'Column 5', headerName: '5', width: 50},
    { field: 'Column 6', headerName: '6', width: 50},
    { field: 'Column 7', headerName: '7', width: 50},
    { field: 'Column 8', headerName: '8', width: 50},
    { field: 'Column 9', headerName: '9', width: 50},
  ];

  return (
    <Table
        sx={{
          '&.MuiTable-root': {
            width: 'auto'
          }
        }}
      >
        <TableBody>
          {columns.map((col, key) => (
            <TableRow
            {...(key % 3 == 0 && key != 0) ? 
              
              {sx:{
                '&.MuiTableRow-root': {
                  border: '1px solid black',
                  borderTop: '5px solid black',
                }
              }
            } : 
            {sx: {
              '&.MuiTableCell-root': {
                border: '1px solid black',
                // height: '30px'
              }
            }}
            }
              key={col.field}
            >
              {columns.map((column, key) => (
                <TableCell 
                  
                  {...(key % 3 == 0 && key != 0) ? 
                    {sx:{
                      '&.MuiTableCell-root': {
                        border: '1px solid black',
                        borderLeft: '5px solid black',
                        maxWidth: '20px',
                        maxHeight: '20px'

                      }
                    }
                  } : 
                  {sx: {
                    '&.MuiTableCell-root': {
                      border: '1px solid black',
                      maxWidth: '20px',
                      maxHeight: '20px'
                    }
                  }}
                  }
                >
                  <div style={{width: '10px', height: '10px'}}>{col.headerName}</div>
                  </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default SudokuGrid;