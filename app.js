/**
 * Created by clarencel on 8/19/17.
 */

const readline = require('readline');
const fs = require('fs');
const Board = require('./components/board');


if (process.argv.length >= 4){
  /*
  ****************************************************************
  1st arg is fileName
  2nd arg is delay between generations
  ****************************************************************
   */
  let fileName = process.argv[2];
  let delayMs = parseInt(process.argv[3], 10);

  const seed = JSON.parse(fs.readFileSync(`./seed/${fileName}`, 'utf8'));
  const board = new Board(seed);

  board.render();

  setInterval(() =>{

    // reset stdout
    process.stdout.write('\x1B[2J\x1B[0f');

    board.stepGeneration();

    board.render();

  }, delayMs)
}
else {


  // interactive mode - prompt for file name

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter seed JSON filename: ', ( fileName ) =>{


    const seed = JSON.parse(fs.readFileSync(`./seed/${fileName}`, 'utf8'));

    console.log(seed);

    const board = new Board(seed);


  });
}



/*
const seed = JSON.parse(fs.readFileSync(`./seed/blinker.json`, 'utf8'));
const board = new Board(seed);

board.render();
*/