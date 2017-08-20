/**
 * Game of Life
 *
 * Note for seed JSONs, we are using column major, so the seeds are displayed rotated
 *
 * Run via command line, 1st arg is the filename in seed folder, 2nd arg is delay between generations:
 *
 * e.g. node app.js flower.json 250
 *
 * Can also run without args, it will prompt for the file name and the delay in ms on 1 line, with a space separating them
 *
 * Created by clarencel on 8/19/17.
 */

const readline = require('readline');
const fs = require('fs');
const Board = require('./model/board');


if (process.argv.length >= 4){
  /*
  ****************************************************************
  1st arg is fileName
  2nd arg is delay between generations
  ****************************************************************
   */
  let fileName = process.argv[2];
  let delayMs = parseInt(process.argv[3], 10);


  try {
    const seed = JSON.parse(fs.readFileSync(`./seed/${fileName}`, 'utf8'));
    const board = new Board(seed);

    run(board, delayMs);
  }
  catch (err) {
    console.error(err);
    return
  }


}
else {


  // interactive mode - prompt for file name

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter seed JSON filename then a space followed by delay between generations in ms: ', ( inputStr ) =>{

    const inputAry = inputStr.split(' ');

    const fileName = inputAry[0];
    let delayMs = parseInt(inputAry[1], 10);

    const seed = JSON.parse(fs.readFileSync(`./seed/${fileName}`, 'utf8'));

    const board = new Board(seed);

    run(board, delayMs);


  });
}


function run( board, delayMs ){

  board.render();


  setInterval(() =>{

    // reset stdout
    process.stdout.write('\x1B[2J\x1B[0f');

    board.stepGeneration();

    board.render();

  }, delayMs)

}

