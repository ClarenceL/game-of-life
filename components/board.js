/**
 * Created by clarencel on 8/19/17.
 */


const ALIVE = 1;
const DEAD = 0;

class Board {

  /**
   * We initialize Board with a seed
   *
   * We assume seed.cells is a proper orthogonal matrix
   *
   * @param seed - struct with keys - size: int, cells: 2D array seed
   */
  constructor( seed ){

    this.generation = 1;


    this.boardSize = parseInt(seed.size);
    this.board = Board.initBoard(seed.cells, this.boardSize);


  }



  /**
   * Get number of neighbors that are alive
   *
   * @param x
   * @param y
   */
  getNeighborsCount( x, y ){

    let neighborsCnt = 0;
    for (let neighborX = x - 1; neighborX <= x + 1; neighborX++){
      for (let neighborY = y - 1; neighborY <= y + 1; neighborY++){

        if ((neighborX === x && neighborY === y) ||
            neighborX < 0 || neighborY < 0 ||
            neighborX >= this.boardSize || neighborY >= this.boardSize){

          continue

        }

        if (this.board[neighborX][neighborY] === ALIVE){
          neighborsCnt += 1;
        }

      }
    }

    return neighborsCnt
  }


  killCell( newBoard, x, y ){
    if (this.board[x][y] === ALIVE){
      newBoard[x][y] = DEAD;
    }
  }

  makeAlive( newBoard, x, y ){
    if (this.board[x][y] === DEAD){
      newBoard[x][y] = ALIVE;
    }
  }


  stepGeneration(){

    let newBoard = Board.copyBoard(this.board);

    for (var x = 0; x < this.boardSize; x++){
      for (var y = 0; y < this.boardSize; y++){

        let neighborsCnt = this.getNeighborsCount(x, y);

        if (neighborsCnt === 3){
          this.makeAlive(newBoard, x, y);
          continue
        }

        if ((neighborsCnt < 2) || (neighborsCnt > 3)){
          this.killCell(newBoard, x, y);
        }
      }
    }

    this.board = newBoard;

  }


  /**
   * we render to process.stdout
   *
   */
  render(){

    // draw one line at a time
    for (let x = 0; x < this.boardSize; x++){

      let line = '';

      for (let y = 0; y < this.boardSize; y++){

        line += this.board[x][y] === ALIVE ? 'o' : '_';
      }

      process.stdout.write(line + '\n');
    }


  }


  /*
  ************************************************************************
  Static Helpers
  ************************************************************************
   */
  /**
   * Our seed only contains the relevant cells,
   * we need to pad the board to size by size
   *
   */
  static initBoard( seedCells, boardSize ){

    // create a blank board first
    let board = Board.createBlankBoard(boardSize);

    // populate with cells from seed
    for (let x = 0; x < seedCells.length; x++){
      for (let y = 0; y < seedCells[x].length; y++){
        board[ x ][ y ] = seedCells[ x ][ y ];
      }
    }

    return board
  }


  static createBlankBoard( boardSize ){

    let blankBoard = new Array(boardSize).fill(0);

    blankBoard = blankBoard.map(() =>{
      return new Array(boardSize).fill(0);
    });

    return blankBoard
  }


  /**
   * Returns a copy of board, this doesn't do deep copy,
   * just 1 level for a 2D array
   *
   */
  static copyBoard( oldBoard ){

    let newBoard = new Array(oldBoard.length);

    for (let i = 0; i < oldBoard.length; i++){
      newBoard[i] = Object.assign([], oldBoard[i]);
    }

    return newBoard
  }
}

module.exports = Board;












