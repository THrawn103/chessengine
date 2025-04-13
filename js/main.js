var board = null;
var boardMimic=null;
var game = new Chess();
var mimic = new Chess();
let eval = 0;
let isWhiteMove = true;
function whiteMove() {
  if (!isWhiteMove) return;
  // chess.js gives us all the possible moves in an array
  // [ move1, move2, move3 ... ]
  let moved = false;
  let notRandom = false;
  var possibleMoves = game.moves();
  eval = -1000;
  // exit if the game is over
  if (game.game_over()) return;

  // choses a random index in the list
  for (let i = 0; i < possibleMoves.length; i++)
  {
    if(possibleMoves[i].includes("#"))
      {
        game.move(possibleMoves[i]);
        board.position(game.fen())
        moved = true;
      }
     /* else if(possibleMoves[i].includes("x") )
      {
        mimic = new Chess(game.fen());
        mimic.move(possibleMoves[i]);
      if(mimic.evaluate(mimic.fen()) > eval)
      {
        eval = mimic.evaluate(mimic.fen());
      }
      notRandom=true;
    }*/
  }
  if(notRandom==true)
    {

   /* for(let i = 0;i< possibleMoves.length;i++)
      {
        mimic = new Chess(game.fen());
        mimic.move(possibleMoves[i]);
        if(mimic.evaluate(mimic.fen()) == eval)
          {
            game.move(possibleMoves[i]);
            moved = true;
            console.log(mimic.evaluate(mimic.fen()));
            break;
          }
        }*/
      
  } 
  if(moved == false)
  {
      var randomIdx = Math.floor(Math.random() * possibleMoves.length);
       mimic = new Chess(game.fen());
      // updates javascript board state
      const move = getBestMove(2,mimic); // depth 2 for simplicity
console.log("Best move:", move);
game.move(move);

      // changes html board state
      board.position(game.fen());
    
  }
  isWhiteMove = false;  
  // call this function again in 5 secs
    window.setTimeout(blackMove, 500);
}
function blackMove() {
  if (isWhiteMove) return;
  // chess.js gives us all the possible moves in an array
  // [ move1, move2, move3 ... ]
  let moved = false;
  var possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over()) return;

  // choses a random index in the list
  
  var randomIdx = Math.floor(Math.random() * possibleMoves.length);

  // updates javascript board state
  game.move(possibleMoves[randomIdx]);

  // changes html board state
  board.position(game.fen());
  isWhiteMove = true;
  // call this function again in 5 secs
  window.setTimeout(whiteMove, 500);
}

board = Chessboard("myBoard", "start");

window.setTimeout(whiteMove, 500);
