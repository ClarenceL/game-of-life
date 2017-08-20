/**
 * Created by clarencel on 8/19/17.
 */


const ALIVE = 1;
const DEAD = 0;

class Board {

  /**
   * We initialize Board with a seed struct
   *
   * We assume seed.cells is a rectangular matrix
   *
   * @param seed -  struct with keys - width: int, height: int, cells: 2D array seed,
   *                (optional) center_seed: int - this centers the seed - defaults to 1
   */
  constructor( seed ){

    this.generation = 1;

    this.boardWidth = seed.width;
    this.boardHeight = seed.height;
    this.board = Board.initBoard(seed);

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
            neighborX >= this.boardWidth || neighborY >= this.boardHeight){

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

    for (var x = 0; x < this.boardWidth; x++){
      for (var y = 0; y < this.boardHeight; y++){

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

    // step - replace this.board with the next generation
    this.generation += 1;
    this.board = newBoard;

  }


  /**
   * For now we render to process.stdout
   *
   * TODO: allow a flexible view to linked
   */
  render(){

    // draw one horizontal line at a time
    for (let y = 0; y < this.boardHeight; y++){

      let line = '';

      for (let x = 0; x < this.boardWidth; x++){

        line += this.board[x][y] === ALIVE ? 'o' : '_';
      }

      process.stdout.write(line + '\n');
    }

    process.stdout.write('Generation: ' + this.generation + '\n');

  }


  /*
  ************************************************************************
  Static Helpers
  ************************************************************************
   */
  /**
   * Our seed only contains the relevant cells,
   * we need to pad the board to size by size first
   *
   * A visual improvement, we try to center the seed in the board by default
   */
  static initBoard({cells: seedCells, width: boardWidth, height: boardHeight, center_seed: centerSeed = 1}){

    // create a blank board first
    let board = Board.createBlankBoard(boardWidth, boardHeight);

    // assume the seed is orthogonal
    const seedWidth = seedCells.length;
    const seedHeight = seedCells[0].length;

    let leftOffset = 0;
    let topOffset = 0;
    if (centerSeed){
      leftOffset = Math.floor((boardWidth - seedWidth) / 2);
      topOffset = Math.floor((boardHeight - seedHeight) / 2);
    }

    // populate with cells from seed
    for (let x = 0; x < seedCells.length; x++){
      for (let y = 0; y < seedCells[x].length; y++){
        board[ leftOffset + x ][ topOffset + y ] = seedCells[ x ][ y ];
      }
    }

    return board
  }


  static createBlankBoard( boardWidth, boardHeight ){

    let blankBoard = new Array(boardWidth).fill(0);

    blankBoard = blankBoard.map(() =>{
      return new Array(boardHeight).fill(0);
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












