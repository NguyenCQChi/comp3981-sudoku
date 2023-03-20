const CSP = (board: any) => {
  // console.log("solving csp")
  const boardSize= board.length  
  let csp: boolean[] = []
  backtrack(csp, board)
};

//n = size of board, c = 1-size of board (all the choices)
const isValid = (board: any, row: number, col: number, n: number, c: number) => {
  const smallBoxRow = Math.floor(Math.sqrt(n)) //3 flipped
  // console.log(smallBoxRow)
  const smallBoxCol = Math.ceil(Math.sqrt(n)) //4
  // console.log(smallBoxCol)
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

function backtrack(csp: any, board: any) {
  const completed = isBoardComplete(board)
  // console.log("completed variable")
  if (completed) {
    return board
  }
  // console.log("getting cell domains")
  var boardDomains = getCellDomains(csp, board)
  // console.log(boardDomains)

  // find which variable (cell) should be assigned next
  var unassignedCell = selectUnassignedVariable(csp, board, boardDomains)
  let row = unassignedCell[0]
  let col = unassignedCell[1]

  // order the values for which the variable should be tried (ie 1 or 9 or 5 or etc)
  var orderOfDomainValues = orderDomainValues(csp, unassignedCell, board, boardDomains) //map  
  var sortedDomainValues = sortOrderOfDomainValues(orderOfDomainValues)

  sortedDomainValues.forEach((domainValue,key) => {
    board[row][col] = key
    //
    //
    // DEBUG FROM HEREEEEEEEE!!!!!!!
    //
    //
    //
    //
    let inferences = inference(csp, unassignedCell, board, boardDomains)

    if (!inferences) {
      csp.push(inferences)
      let result = backtrack(csp, board)
      // if result does not equal failure, return result
      if (result != board) {
        return result
      }
      csp.pop(inferences)
    }
    board[row][col] = 0
  });
  return board
}

const getNeighbors = (board: any, queue: any, row: any, col: any) => {

  for (let i = 0; i < board.length; i++) {
    if (board[row][i] == 0 && i != col) {
      // Xi = row, i 
      // Xj = row, col
      queue.push([row, i, row, col])
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][col] == 0 && i != row) {
      queue.push([i, col, row, col])
    }
  }
  
  const boardSize = board.length
  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let x = (Math.floor(row / rowSize)*rowSize)+i
      let y = (Math.floor(col / colSize)*colSize)+j
      if (board[x][y] == 0 && x != row && y != col) {
        queue.push([x, y, row, col])
      }
    }
  }
  return queue
}

// AC-3 Algorithm
const inference = (csp: any, unassignedCell: any, board: any, boardDomains: any) => {
  // queue of initial arcs
  let initialQueue: never[] = []

  let row = unassignedCell[0]
  let col = unassignedCell[1]

  let queue = getNeighbors(board, initialQueue, row, col)

  // console.log("row: " + unassignedCell[0])
  // console.log("col: " + unassignedCell[1])

  while (queue.length != 0) {
    let popped = queue.shift()
    if (popped != undefined) {
      var XiRow = popped[0]
      var XiCol = popped[1]
      var XjRow = popped[2]
      var XjCol = popped[3]
    }
    if (revise(csp, popped, boardDomains)) {
      if (board[XiRow][XiCol] == 0 && boardDomains[XiRow][XiCol].length == 0) {
        // failure when  there is nothing left in the domain
        return false
      }
      let initialNeighborsQueue: never[] = []
      let neighborsQueue = getNeighbors(board, initialNeighborsQueue, XiRow, XiCol)
      neighborsQueue.pop([XjRow, XjCol, XiRow, XiCol])
      neighborsQueue.forEach((XkRow: any, XkCol: any, XiRow: any, XiCol: any) => queue.push([XkRow, XkCol, XiRow, XiCol]));
    }
  }
  return true
}

// REVISE called in AC-3
const revise = (csp: any, popped: any, boardDomains: any) => {
  let revised = false
  let XiRow = popped[0]
  let XiCol = popped[1]
  let XjRow = popped[2]
  let XjCol = popped[3]
  let satisfiesConstraint = true
  boardDomains[XiRow][XiCol].forEach((Di: any) => {
    boardDomains[XjRow][XjCol].forEach((Dj: any) => {
      if (Dj == Di) {
        satisfiesConstraint = false
      }}); 
    if (satisfiesConstraint) {
      boardDomains[XiRow][XiCol].pop(Di)
      revised = true
    }
  });
  return revised;
}


//sorts domain values from lowest to highest
const sortOrderOfDomainValues = (orderDomainValues: any) => {
  const sorted = new Map([...orderDomainValues.entries()].sort((a, b) => a[1] - b[1]))
  return sorted
}

const orderDomainValues = (csp: any, unassignedCell: any, board: any, boardDomains: any) => {
  let row = unassignedCell[0]
  let col = unassignedCell[1]
  console.log("row: " + unassignedCell[0])
  console.log("col: " + unassignedCell[1])

  let sortedDomainValues = new Map()
  console.log(boardDomains)
  boardDomains[row][col].forEach((d: any) => sortedDomainValues.set(d, 0)) //ex. [1:0, 2:0, 3:0, 8:0]

  // console.log("initial domain values of first cell")
  // console.log(sortedDomainValues)

  for (let i = 0; i < board.length; i++) {
    if (board[row][i] == 0 && i != col) {
      boardDomains[row][i].forEach((d: any) => boardDomains[row][col].includes(d) ? sortedDomainValues.set(d, sortedDomainValues.get(d)+1) : '')
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][col] == 0 && i != row) {
      boardDomains[i][col].forEach((d: any) => boardDomains[row][col].includes(d) ? sortedDomainValues.set(d, sortedDomainValues.get(d)+1) : '')
    }
  }

  const boardSize = board.length
  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let x = (Math.floor(row / rowSize)*rowSize)+i
      let y = (Math.floor(col / colSize)*colSize)+j
      if (board[x][y] == 0 && x != row && y != col) {
        boardDomains[x][y].forEach((d: any) => boardDomains[row][col].includes(d) ? sortedDomainValues.set(d, sortedDomainValues.get(d)+1) : '')    
      }
    }
  }
  // console.log("sorted domain val")
  // console.log(sortedDomainValues)
  return sortedDomainValues
}

//helper function to find the smallest domain cell
const getSmallestDomainCell = (board: any) => {
  let x = 0
  let y = 0
  let smallestDomainCell = [x, y]
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        x = i
        y = j
        smallestDomainCell = [x, y]
        return smallestDomainCell
      }
    }
  }
  return smallestDomainCell
}

const selectUnassignedVariable = (csp: any, board: any, boardDomains: any) => {

  let smallestDomainCell = getSmallestDomainCell(board)
  let x = smallestDomainCell[0]
  let y = smallestDomainCell[1]

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        //find smallest domain OR if domains are same size, finds the greater degree (tie breaker)
        if (boardDomains[i][j].length < boardDomains[x][y].length || boardDomains[i][j].length == boardDomains[x][y].length && getDegree(board, i, j) > getDegree(board, x, y)){
          x = i
          y = j
          smallestDomainCell = [x, y]
        }
      }
    }
  }
  return smallestDomainCell
}

const getDegree = (board: any, row: any, col: any) => {
  let numAffectedDomains = []
  const boardSize = board.length

  for (let i = 0; i < board.length; i++) {
    if (board[row][i] == 0 && i != col) {
      numAffectedDomains.push([row, i])
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][col] == 0 && i != row) {
      numAffectedDomains.push([i, col])
    }
  }

  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let x = (Math.floor(row / rowSize)*rowSize)+i
      let y = (Math.floor(col / colSize)*colSize)+j

      if (board[x][y] == 0 && x != row && y != col) {
        let stringifiedArray = JSON.stringify(numAffectedDomains)
        let stringified = JSON.stringify([x, y])
        let found = stringifiedArray.indexOf(stringified)
        if (found == -1) {
          numAffectedDomains.push([x, y])
        }
      }
    }
  }
  console.log(numAffectedDomains)
  return numAffectedDomains.length
}


const getCellDomains = (csp: any, board: any) => {
  var boardSize = board.length
  var domainBoard = Array.from(Array(boardSize), () => new Array(boardSize))

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      domainBoard[i][j] = Array.from({length: boardSize}, (_, boardSize) => boardSize + 1)
      if (board[i][j] == 0) {
        let reducedDomain = reduceDomain(board, i, j) 
        domainBoard[i][j] = domainBoard[i][j].filter((n: number) => !reducedDomain.has(n))
      } else {
        domainBoard[i][j] = 0
      }
    }
  }
  return domainBoard
}

const reduceDomain = (board: any, row: number, col: number) => {
  let updatedDomain = new Set()
  const numbersInRow = getNumbersInSameRow(board, row)
  const numbersInCol = getNumbersInSameCol(board, col)
  const numbersInSameBox = getNumbersInSameBox(board, row, col)
  // console.log("num in row " + numbersInRow)
  // console.log("num in col " + numbersInCol)
  // console.log("numbers in same box " + numbersInSameBox)

  numbersInRow.forEach((n) => updatedDomain.add(n))
  numbersInCol.forEach((n) => updatedDomain.add(n))
  numbersInSameBox.forEach((n) => updatedDomain.add(n))
  return updatedDomain
}

// gets list of numbers that are already exist in the row
const getNumbersInSameRow = (board: any, row: number) => {
  var numbersInSameRow = []
  for (let col = 0; col < board.length; col++) {
    if (board[row][col] != 0) {
      numbersInSameRow.push(board[row][col])
    }
  }
  return numbersInSameRow
}

// gets list of numbers that already exist in the col
const getNumbersInSameCol = (board: any, col: number) => {
  var numbersInSameCol = []
  for (let row = 0; row < board.length; row++) {
    if (board[row][col] != 0) {
      numbersInSameCol.push(board[row][col])
    }
  }
  return numbersInSameCol
}

const getNumbersInSameBox = (board: any, row: number, col: number) => {
  const boardSize = board.length
  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  var numbersInSameBox = []
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let x = (Math.floor(row / rowSize)*rowSize)+i
      let y = (Math.floor(col / colSize)*colSize)+j
      if (board[x][y] != 0) {
        numbersInSameBox.push(board[x][y])
      }
    }
  }
  return numbersInSameBox
}

//checks if board is complete (aka if there is something assigned in every cell)
const isBoardComplete = (board: any) => {
  var finished = false
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        return false
      }
    }
  }
  return true
}

export { CSP };