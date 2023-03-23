const CSP = (board: any) => {
  const boardSize= board.length  
  let csp: never[] = []
  var originalBoardDomains = getCellDomains(csp, board)
  backtrack(csp, board, originalBoardDomains)
};

//n = size of board, c = 1-size of board (all the choices)
const isValid = (board: any, x: number, y: number, n: number, c: any) => {
  const rowSize = Math.floor(Math.sqrt(n))
  const colSize = Math.ceil(Math.sqrt(n))
  let box = []
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      box.push(board[(Math.floor(x / rowSize)*rowSize)+i][(Math.floor(y / colSize)*colSize)+j])
    }
  }

  let row = []
  let col = []
  for (let i = 0; i < n; i++) {
    row.push(board[x][i])
    col.push(board[i][y])
  }

  for (let i = 1; i <= n; i++) {
    if (!row.includes(c) && !col.includes(c) && !box.includes(c)) {
      return true;
    }
  }
  return false;
}

function backtrack(csp: any, board: any, boardDomains: any) {
  const completed = isBoardComplete(board)
  if (completed) {
    console.log("Board should be complete here")
    return true
  }

  // find which variable (cell) should be assigned next
  var unassignedCell = selectUnassignedVariable(csp, board, boardDomains)
  let row = unassignedCell[0]
  let col = unassignedCell[1]

  // order the values for which the variable should be tried (ie 1 or 9 or 5 or etc)
  var orderOfDomainValues = orderDomainValues(csp, unassignedCell, board, boardDomains) //map  
  var sortedDomainValues = sortOrderOfDomainValues(orderOfDomainValues)

  //domainValue is not used, we just needed key in the map {key=1:2}
  sortedDomainValues.forEach((domainValue,key) => {
    // const currentIterationBoardDomains = boardDomains
    if (isValid(board, row, col, board.length, key)) {
      board[row][col] = key
      let currentRow = row
      let currentCol = col
      // saves the original domain of newly assigned cell, ie [1, 2, 3, 4]
      const currentCellOldDomains = structuredClone(boardDomains[row][col])
      console.log("Assigning " + key + " to row " + row + ", col " + col)
      boardDomains[row][col] = [] 
      // reassigns domain of newly assigned cell to length 1, ie [1]
      boardDomains[row][col].push(key)
      let inferences = inference(csp, board, boardDomains, unassignedCell)
      
      if (inferences) {
        // csp.push(inferences)
        let result = backtrack(csp, board, boardDomains)
        // if result does not equal failure, return result
        if (result) {//if result true, board is complete
          return true
        }
        // csp.pop(inferences)//!!!!!! needs to be fixed
      } else {
        
        console.log("INFERENCE IS FALSE")
        // reset all changes made
        // reset current cell assignment back to 0
        let currentBoard = board
        let currentBoardDomains = boardDomains
        board[row][col] = 0
        
        // saves current cell's domain of length 1 ie [1] - that doens't work for the cell
        let currentCellNewDomain = boardDomains[row][col]
        // saves originalBoardDomains, ie all cells have [1, 2, 3, 4]
        let originalBoardDomains = getCellDomains(csp, board)
        // set reassigned cell back to its original domain
        // boardDomains[row][col] = currentCellOldDomains
  
        boardDomains = originalBoardDomains
  
        // get the index of the domain that didn't work, ie where is 1 in [1, 2, 3, 4]
        // let index = originalBoardDomains[row][col].indexOf(currentCellNewDomain[0])
        // remove domain that didn't work from current cell's original domain
        // boardDomains[row][col].splice(index, 1)
        boardDomains[row][col].filter((n: any) => n != currentCellNewDomain[0])
      }
    }
  });
  return false
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
const inference = (csp: any, board: any, boardDomains: any, unassignedCell: any) => {
  let row = unassignedCell[0]
  let col = unassignedCell[1]
  let initialQueue: any[] = []
  let queue = getNeighbors(board, initialQueue, row, col)
  // instead of getting all arc, try getting only changed cell's neighbor arcs
  // let queue = getAllArcs(board)

  while (queue.length != 0) {
    let popped = queue.shift() //removes first item from queue
    if (popped != undefined) {
      var XiRow = popped[0]
      var XiCol = popped[1]
    }
    let revised = revise(csp, popped, boardDomains)
    if (revised) {
      if (boardDomains[XiRow][XiCol].length == 0) {
        // failure when there is nothing left in the domain
        return false
      }
      let initialNeighborsQueue: never[] = []
      let neighborsQueue = getNeighbors(board, initialNeighborsQueue, XiRow, XiCol)
      // neighborsQueue.pop([XjRow, XjCol, XiRow, XiCol])//<-- needs to be replaced
      queue = queue.concat(neighborsQueue)
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

  boardDomains[XiRow][XiCol].forEach((x: any) => {
    // if no value in Xj's domain allows (Di, Dj) to satisfy the constraint b/w Xi and Xj
    // Xi's domain = {1, 2, 3}, Xj's domain = {3}
    console.log("board domain of Xj: " + boardDomains[XjRow][XjCol]) //8
    console.log("XjRow: " + XjRow + ", XjCol: " + XjCol)
    console.log("board domain of Xi: " + boardDomains[XiRow][XiCol]) //8
    console.log("XiRow: " + XiRow + ", XjCol: " + XiCol)
    if (boardDomains[XjRow][XjCol].includes(x) && boardDomains[XjRow][XjCol].length == 1) { //Di {1,2,3} Dj{1,2,3,4}
      console.log("true in if statement here!")
      let index = boardDomains[XiRow][XiCol].indexOf(x)
      boardDomains[XiRow][XiCol].splice(index, 1)
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

// counts the number of each possible unassigned value in each row, col, box
//ex. [1:5, 2:3, 3:2, 8:0]
const orderDomainValues = (csp: any, unassignedCell: any, board: any, boardDomains: any) => {
  let row = unassignedCell[0]
  let col = unassignedCell[1]

  let sortedDomainValues = new Map()
  boardDomains[row][col].forEach((d: any) => sortedDomainValues.set(d, 0)) //ex. [1:0, 2:0, 3:0, 8:0]
  
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
  return sortedDomainValues
}

//helper function to find the smallest domain cell
// actually, this gets the first unassigned cell
const getFirstUnassignedCell = (board: any) => {
  let x = 0
  let y = 0
  let firstUnAssignedCell = [x, y]
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        x = i
        y = j
        firstUnAssignedCell = [x, y]
        return firstUnAssignedCell
      }
    }
  }
  return firstUnAssignedCell
}

// LOOK AT THIS FUNCTIOIN, LOOKS WEIRD
const selectUnassignedVariable = (csp: any, board: any, boardDomains: any) => {

  let firstUnAssignedCell = getFirstUnassignedCell(board)
  let x = firstUnAssignedCell[0]
  let y = firstUnAssignedCell[1]

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        //find smallest domain OR if domains are same size, finds the greater degree (tie breaker)
        if ((boardDomains[i][j].length < boardDomains[x][y].length) || ((boardDomains[i][j].length == boardDomains[x][y].length) && (getDegree(board, i, j) > getDegree(board, x, y)))){
          x = i
          y = j
          firstUnAssignedCell = [x, y]
        }
      }
    }
  }
  return firstUnAssignedCell
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
      if (((board[x][y] == 0) && (x != row) && (y != col) && (x != row || y != row))) {
        numAffectedDomains.push([x, y])
      }
    }
  }
  return numAffectedDomains.length
}


const getCellDomains = (csp: any, board: any) => {
  var boardSize = board.length
  var domainBoard = Array.from(Array(boardSize), () => new Array(boardSize))

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      domainBoard[i][j] = Array.from({length: boardSize}, (_, boardSize) => boardSize + 1)
      if (board[i][j] == 0) { 
        // a list of assigned numbers that already present in the same row, col and box
        let currentPlacedNumbers = placedNumbers(board, i, j) 
        domainBoard[i][j] = domainBoard[i][j].filter((n: number) => !currentPlacedNumbers.includes(n))
        // ASSIGNING VALUES HERE, MIGHT BE BAD
        // if (domainBoard[i][j].length == 1) {
        //   board[i][j] = domainBoard[i][j][0]
        // }
      } else {
        domainBoard[i][j] = [board[i][j]]
      }
    }
  }
  let cellDomains = domainBoard
  return domainBoard
}

// makes a list of all the numbers that are present in the same row, col and box
const placedNumbers = (board: any, row: number, col: number) => {
  // let updatedDomain = new Set()
  let updatedDomain: any[] = []
  const numbersInRow = getNumbersInSameRow(board, row)
  const numbersInCol = getNumbersInSameCol(board, col)
  const numbersInSameBox = getNumbersInSameBox(board, row, col)

  numbersInRow.forEach((n) => updatedDomain.push(n))
  numbersInCol.forEach((n) => updatedDomain.push(n))
  numbersInSameBox.forEach((n) => updatedDomain.push(n))

  return updatedDomain
}

// gets list of numbers that already exist in the row
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

// get list of numbers that already exist in the box of that row and column
const getNumbersInSameBox = (board: any, row: number, col: number) => {
  const boardSize = board.length
  const rowSize = Math.floor(Math.sqrt(boardSize))
  const colSize = Math.ceil(Math.sqrt(boardSize))
  var numbersInSameBox = []
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      let x = (Math.floor(row / rowSize)*rowSize)+i
      let y = (Math.floor(col / colSize)*colSize)+j
      // added this to check that we don't add numbers in same box that were already added
      if (((board[x][y] != 0) && (x != row) && (y != col) && (x != row || y != col))) {
        numbersInSameBox.push(board[x][y])
      }
    }
  }
  return numbersInSameBox
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

export { CSP };