const CSP = (board: any) => {
  // console.log("solving csp")
  const boardSize= board.length  
  let csp: never[] = []
  let queue = getAllArcs(board)
  let unassignedCells = getAllUnassigned(board)
  // console.log(board)
  
  backtrack(csp, board, queue)
  // console.log(board)
};

const getAllArcs = (board: any) => {
  let queue: any[] = []
  // queue[0][1] = [XiRow, XiCol, XjRow, XjCol]

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let emptyNeighborsQueue: any[] = []
      let neighborsQueue: any[] = getNeighbors(board, emptyNeighborsQueue, i, j)
      queue = queue.concat(neighborsQueue)      
    }
  }
  return queue
}

const getAllUnassigned = (board: any) => {
  let allUnassignedCells = []
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 0) {
        allUnassignedCells.push([i, j])
      }
    }
  }
  return allUnassignedCells
}

//n = size of board, c = 1-size of board (all the choices)
const isValid = (board: any, row: number, col: number, n: number, c: any) => {
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

function backtrack(csp: any, board: any, queue: any) {
  const completed = isBoardComplete(board)
  if (completed) {
    return true
  }
  var boardDomains = getCellDomains(csp, board)

  // find which variable (cell) should be assigned next
  var unassignedCell = selectUnassignedVariable(csp, board, boardDomains)
  let row = unassignedCell[0]
  let col = unassignedCell[1]

  // order the values for which the variable should be tried (ie 1 or 9 or 5 or etc)
  var orderOfDomainValues = orderDomainValues(csp, unassignedCell, board, boardDomains) //map  
  var sortedDomainValues = sortOrderOfDomainValues(orderOfDomainValues)
  // console.log("sortedDomainValues")
  // sortedDomainValues.forEach((x)=> console.log(x))

  //domainValue is not used, we just needed key in the mah {key=1:2}
  sortedDomainValues.forEach((domainValue,key) => {
    if (isValid(board, row, col, board.length, key)) {
      // console.log("BEFORE: Assigning " + key + " to row " + row + ", col " + col)
      // console.log("board domains before:")
      // boardDomains.forEach((d) => console.log(d))
      board[row][col] = key
      var currentCellOldDomains = boardDomains[row][col]//note: currently shallow copy, might need a deep copy
      
      console.log("Assigning " + key + " to row " + row + ", col " + col)
      boardDomains[row][col] = []
      boardDomains[row][col].push(key)
      // console.log("key: " + key)
      // console.log("board domains of recently assigned cell: " + boardDomains[row][col])
      // console.log("board domains after")
      // boardDomains.forEach((d) => console.log(d))
      let inferences = inference(csp, board, boardDomains, queue)
      // console.log("inferences " + inferences)
  
      if (inferences) {
        csp.push(inferences)
        let result = backtrack(csp, board, queue)
        // console.log(result) //Check if a value has been added
        // if result does not equal failure, return result
        if (result) {//result != board
          // return result
          return result
        }
        csp.pop(inferences)//!!!!!! needs to be fixed
      }
      board[row][col] = 0
      let currentCellNewDomain = boardDomains[row][col]
      boardDomains[row][col] = currentCellOldDomains
      let index = boardDomains[row][col].indexOf(currentCellNewDomain)
      boardDomains[row][col].splice(index, 1)
    }
  });
  // return board
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
const inference = (csp: any, board: any, boardDomains: any, queue: any) => {
  // queue of initial arcs
  let initialQueue: never[] = []

  // console.log(queue.length)
  while (queue.length != 0) {
    let popped = queue.shift() //removes first item from queue
    if (popped != undefined) {
      var XiRow = popped[0]
      var XiCol = popped[1]
    }
    if (revise(csp, popped, boardDomains)) {
      
      // console.log("XiRow: " + XiRow + " XiCol: " + XiCol + " num domains: " + boardDomains[XiRow][XiCol].length)
      
      // if (board[XiRow][XiCol] == 0 && boardDomains[XiRow][XiCol].length == 0) {
      if (boardDomains[XiRow][XiCol].length == 0) {
        // failure when  there is nothing left in the domain
        return false
      }
      let initialNeighborsQueue: never[] = []
      let neighborsQueue = getNeighbors(board, initialNeighborsQueue, XiRow, XiCol)
      // console.log("neighbors queue")
      // neighborsQueue.forEach((q: any) => console.log(q));
      // neighborsQueue.pop([XjRow, XjCol, XiRow, XiCol])//<-- needs to be replaced
      // console.log("neighbors queue")
      // neighborsQueue.forEach((q: any) => console.log(q));
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
  let satisfiesConstraint = true
  // console.log("in revise")

  boardDomains[XiRow][XiCol].forEach((x: any) => {
    // if no value in Xj's domain allows (Di, Dj) to satisfy the constraint b/w Xi and Xj
    // Xi's domain = {1, 2, 3}, Xj's domain = {3}
    // console.log("length: " + boardDomains[XjRow][XjCol].length)
    // console.log(boardDomains[XjRow][XjCol])
    if (boardDomains[XjRow][XjCol].includes(x) && boardDomains[XjRow][XjCol].length == 1) { //Di {1,2,3} Dj{1,2,3,4}
      // console.log(boardDomains[XjRow][XjCol])
      // console.log(x)
      // console.log("reducing domain")
      console.log(boardDomains[XiRow][XiCol])
      let index = boardDomains[XiRow][XiCol].indexOf(x)
      boardDomains[XiRow][XiCol].splice(index, 1)
      console.log(boardDomains[XiRow][XiCol])
      revised = true
    }
    // boardDomains[XjRow][XjCol].forEach((Dj: any) => {
    //   // console.log("Dj: " + Dj + " Di: " + Di)
    //   if (Dj == Di) {
    //     satisfiesConstraint = false
    //   } else {
    //     satisfiesConstraint = true
    //   }
    // }); 
    // if (!satisfiesConstraint) {
    //   let index = boardDomains[XiRow][XiCol].indexOf(Di)
    //   boardDomains[XiRow][XiCol].splice(index, 1)
    //   revised = true
    // }
  });
  return revised;
}


//sorts domain values from lowest to highest
const sortOrderOfDomainValues = (orderDomainValues: any) => {
  const sorted = new Map([...orderDomainValues.entries()].sort((a, b) => a[1] - b[1]))
  // console.log("sorted order of domain values")
  // console.log(sorted)
  return sorted
}

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
        domainBoard[i][j] = [board[i][j]]
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