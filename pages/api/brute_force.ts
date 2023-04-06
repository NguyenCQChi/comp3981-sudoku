// Solving brute force

export default function handler(req: any, res: any) {
  var board = req.body.value
  const solved = stackBruteForce(board)
  if (solved) {
    res.status(200).json({"board": board})
  } else {
    res.status(404).json({"error": "Not be able to solve", "board": board})
  }
}

//checks if board is complete (aka if there is something assigned in every cell)
const isBoardComplete = (board: any) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        return false
      }
    }
  }
  return true
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
  return isBoardComplete(board)
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

export { stackBruteForce };
