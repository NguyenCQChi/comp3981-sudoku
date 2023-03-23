const bruteForce = (board: any) => {
  const n = board.length;
  dfs(board, n);
  return true
}

const dfs = (board: any, n: number) => {
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (board[row][col] != 0) continue;
      for (let i = 1; i <= n; i++) {
        const c = i.toString()
        if (isValid(board, row, col, n, c)) {
          board[row][col] = i;
          if (dfs(board, n)) return true;
          // board[row][col] = 0;
        }
      }
      board[row][col] = 0;
      return false;
    }
  }
  return true;
}

const isValid = (board: any, row: number, col: number, n: number, c: string) => {
  const smallBoxRow = Math.floor(Math.sqrt(n)) //3 flipped
  const smallBoxCol = Math.ceil(Math.sqrt(n)) //4
  const blockRow = Math.floor(row / smallBoxRow) * smallBoxRow;
  const blockCol = Math.floor(col / smallBoxCol) * smallBoxCol;
  for (let i = 0; i < n; i++) {
    if (board[row][i] == c || board[i][col] == c) return false;
    const curRow = blockRow + Math.floor(i / smallBoxRow);
    const curCol = blockCol + Math.floor(i % smallBoxCol);
    if (board[curRow][curCol] == c) return false;
  }
  return true;
}

const stackBruteForce = (board: any) => {
  let stack = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        stack.push([i, j])
      }
    }
  }
  dfsStack(board, stack)
}

// let startRow = Math.floor(i / Math.ceil(Math.sqrt(sudokuBoard.length))) * Math.sqrt(sudokuBoard.length)
//         let startCol = Math.floor(i / Math.floor(Math.sqrt(sudokuBoard.length))) * Math.sqrt(sudokuBoard.length)

const dfsStack = (board: any, stack: any) => {
  const boardSize = board.length
  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  if (stack.length == 0) return;
  let poppedStack = stack.pop()
  let x = poppedStack[0]
  let y = poppedStack[1]
  
  let box = []
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      box.push(board[(Math.floor(x / rowSize)*rowSize)+i][(Math.floor(y / colSize)*colSize)+j])
    }
  }

  let row = []
  let col = []
  for (let i = 0; i < boardSize; i++) {
    row.push(board[x][i])
    col.push(board[i][y])
  }

  for (let i = 1; i <= boardSize; i++) {
    if (!row.includes(i) && !col.includes(i) && !box.includes(i)) {
      board[x][y] = i
      dfsStack(board, stack)
      if (stack.length == 0) return;
    }
  }
  board[x][y] = 0
  stack.push([x, y])
}

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
        if (board[i + startRow][j + startCol] == val) {
          return false;
        }
      }
    }
  return true;
}

export { stackBruteForce };