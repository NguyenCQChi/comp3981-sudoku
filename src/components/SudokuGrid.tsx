/* eslint-disable react/jsx-key */
import {Table, TableCell, TableRow, TableBody} from "@mui/material";
const SudokuGrid = (props: any) => {
  const {
    size,
    } = props;
  const height = size * 10;
  const nums = Array.from({length: size}, (_, i) => i + 1);
  const columns: any[] = [];

  nums.forEach((n) => {
    columns.push({field: `Column ${n}`, headerName: `${n}`})
  });

  return (
    <Table
        sx={{
          '&.MuiTable-root': {
            width: '100px',
            // height: '100px'
            // width: 'auto'
            // maxWidth: `${height}px`,
            // maxHeight: `${height}px`
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
              {columns.map((column, key) => (
                <TableCell 
                  
                  {...(key % 3 == 0 && key != 0) ? 
                    {sx:{
                      '&.MuiTableCell-root': {
                        border: '1px solid black',
                        borderLeft: '3px solid black',
                        // maxWidth: '20px',
                        // maxHeight: '20px'

                      }
                    }
                  } : 
                  {sx: {
                    '&.MuiTableCell-root': {
                      border: '1px solid black',
                      // maxWidth: '20px',
                      // maxHeight: '20px'
                    }
                  }}
                  }
                >
                  <div 
                  // style={{width: '1rem', height: '1rem'}}
                  >{col.headerName}</div>
                  </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default SudokuGrid;