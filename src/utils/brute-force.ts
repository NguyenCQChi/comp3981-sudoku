// const bruteForce = (sudokuBoard: any[][]) => {
//   const gridSize = sudokuBoard.length

//   // let row = findEmptyCell(sudokuBoard, gridSize)
//   // let col = findEmptyCell(sudokuBoard[row], gridSize)
//   // console.log(col)
//   const position = findEmptyCell(sudokuBoard, gridSize)
//   let row = position[0]
//   let col = position[1]
//   if (row == -1) {
//     return true
//   }
//   for (let num = 1; num <= gridSize; num++) {
//     if (isValid(sudokuBoard, row, col, num, gridSize)) {
//       sudokuBoard[row][col] = num
//       if (bruteForce(sudokuBoard)) {
//         return true
//       }
//       sudokuBoard[row][col] = 0
//     }
//   }
//   return false
// }

// const findEmptyCell = (grid: any, gridSize: any) => {
//   for (let row = 0; row < gridSize; row++) {
//     for (let col = 0; col < gridSize; col++) {
//       if (grid[row][col] == 0) {
//         return [row, col]
//       }
//     }
//   }
//   return [-1, -1]
// }

// const isValid = (grid: any, row: any, col: any, num: any, gridSize: any) => {
//   if (col == -1) {
//     return false;
//   }
//   for (let i = 0; i < gridSize; i++) {
//     if (grid[row][i] == num || grid[i][col] == num) {
//       return false
//     }
//   }
//   const subGridSize = Math.sqrt(gridSize)
//   const subGridRow = Math.floor(row / subGridSize) * subGridSize
//   const subGridCol = Math.floor(col / subGridSize) * subGridSize

//   for (let i = subGridRow; i < subGridRow + subGridSize; i++) {
//     for (let j = subGridCol; j < subGridCol + subGridSize; j++) {
//       if (grid[i][j] == num) {
//         return false
//       }
//     }
//   }
//   return true

// }
// let count = 0
const bruteForce = (sudokuBoard: any[][], row: any, col: any): Boolean => {
  // count++
  // console.log(count)
  // stop going, we're at sudokuBoard[8][9] for 9x9
  if (row == sudokuBoard.length - 1 && col == sudokuBoard[row].length) {
    // console.log(count)
    return true;
  }
  
  // if its the 1+ last col, move to next row
  if (col == sudokuBoard[row].length) {
    row++;
    col = 0;
  }
  
  // checks if a number is in the cell that is not 0 (ie 1-9 for 9x9)
  if (sudokuBoard[row][col] != 0) {
    // console.log("row : " + row +" col: "+ col)
    return bruteForce(sudokuBoard, row, col+1);
  }
    
  for(let num = 1; num <= sudokuBoard.length; num++) {

    // do checks, if safe, assign number to the position
    if (isNotInRowOrCol(sudokuBoard, row, col, num) && isNotInBox(sudokuBoard, row, col, num)) {
    // if (isNotInRow(sudokuBoard, row, num) && isNotInColumn(sudokuBoard, col, num) && isNotInBox(sudokuBoard, row, col, num)) {
      sudokuBoard[row][col] = num;
    //   console.log("row: " + row +" col: "+ (col + 1))
      if (bruteForce(sudokuBoard, row, col + 1)) {
        return true;
      }      
    }
    // resets cell to 0 if number breaks constraints
    sudokuBoard[row][col] = 0;
  }
  return false;
}

// const bruteForce = (sudokuBoard: any[][], row:any, col:any): Boolean => {
//   // let solvedBoard = false
//   // let row = 0
//   // let col = 0
//   let position = [row, col]
  
//   // for (let j = 0; j < (sudokuBoard.length * sudokuBoard.length); j++) {
//     if (!findEmptyPlace(sudokuBoard, position)) {
//       // console.log("stop at: " + position)
//       return false
//     } else {
//       for (let i = 1; i <= sudokuBoard.length; i++) { 
//         let startRow = Math.floor(i / Math.ceil(Math.sqrt(sudokuBoard.length))) * Math.sqrt(sudokuBoard.length)
//         let startCol = Math.floor(i / Math.floor(Math.sqrt(sudokuBoard.length))) * Math.sqrt(sudokuBoard.length)
//         if (!isPresentInRow(sudokuBoard, position[0], i) && !isPresentInColumn(sudokuBoard, position[1], i) && !isPresentInBox(sudokuBoard, startRow, startCol, i)) {
//           console.log(sudokuBoard[position[0]][position[1]] + " is changed to " + i + " at position " + position[0] + ", " + position[1])
//           sudokuBoard[position[0]][position[1]] = i
//           // solvedBoard = true
//           if(bruteForce(sudokuBoard, position[0], position[1])){
//             return true
//           }
//           sudokuBoard[position[0]][position[1]] = 0 
//         }
//       }
//       return false
//     }
//     // return true
//   // }
// }

const isNotInRowOrCol = (board: any, row: any, col: any, val: Number): Boolean => {
  for (let i = 0;i < board.length; i++){
    if(board[row][i] == val || board[i][col] == val){
      return false;
    }
  }
  return true;
}

const isNotInRow = (board: any, row: any, val: Number): Boolean => {
  for (let col = 0;col < board.length; col++){
    if(board[row][col] == val){
      return false;
    }
  }
  return true;
}

const isNotInColumn = (board: any, column: any, val: Number) => {
  for (let row = 0; row < board[column].length; row++) {
    if (board[row][column] == val) {
      return false;
    }
  }
  return true;    
}

const isNotInBox = (board: any, row: any, col: any, val: Number) => {
  let startRow = row - row % Math.ceil(Math.sqrt(board.length))
  let startCol = col - col % Math.floor(Math.sqrt(board.length))

    for(let i = 0; i < Math.ceil(Math.sqrt(board.length)); i++) {
      for(let j = 0; j < Math.floor(Math.sqrt(board.length)); j++) {
        // console.log("row: " + row, " col: " + col)
        if (board[i + startRow][j + startCol] == val) {
          // console.log("box start row: " + (startRow))
          return false;
        }
      }
    }
  return true;
}


// const findEmptyPlace = (board: any, position: any[]) => {
//   for (position[0] = 0; position[0] < board.length; position[0]++) {
//     // console.log("position " + position)
//     console.log("length: " + board[0].length)
//     for (position[1] = 0; position[1] < board[position[0]].length; position[1]++){
//       if(board[position[0]][position[1]] == '' || board[position[0]][position[1]] == 0){
//         // console.log("true: " + board[row][col] + " at position " + row + ", " + col)
//         return true
//       }
//     //   console.log("false: " + board[position[0]][position[1]])
//     }
//   }
//   return false    
// }

export { bruteForce };