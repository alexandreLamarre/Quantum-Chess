import {Qbishop, Qking, Qknight, Qpawn, Qqueen, Qrook} from "../Qpieces";

const WHITE = 0;
const BLACK = 1;

class QuantumBoard {
  /**
  @param scenario int, id for corresponding scenario to load
  @param default bool, loads regular quantum board if true


  @attr board: represents the board as a 1d array, null = no pieces, non-null = id of piece
  @attr pieces: maps (id) -> (quantum piece)
  @attr entangledments: maps (id) -> (list of entabled pieces)
  **/
  constructor(scenario, normal){
    if(normal){
      const res = defaultQuantumBoard();
      this.board = res[0];
      this.pieces = res[1];
      this.entanglements = res[2];
    }

    else if(scenario){
      [this.board,this.pieces,this.entanglements] = loadScenario(scenario);
    }
  }

  getBoard(){
    return this.board;
  }

  getPieces(){
    return this.pieces;
  }

  getEntanglements(){
    return this.entanglements;
  }
}

export default QuantumBoard;

/**
Returns [
    Array representing chess board,
    Map representing pieces (id) -> (Qpiece)
    Map of Entanglements (id) -> (list of pieces it is entangled with)
  ]

**/
function defaultQuantumBoard(){

  const pieces = {
      17: new Qpawn("Rook", WHITE),
      18: new Qpawn("Knight", WHITE),
      19: new Qpawn("Bishop", WHITE),
      20: new Qpawn("Queen", WHITE ),
      21: new Qpawn("King", WHITE),
      22: new Qpawn("Bishop", WHITE),
      23: new Qpawn("Knight", WHITE),
      24: new Qpawn("Rook", WHITE),
      25: new Qrook(WHITE),
      26: new Qknight(WHITE),
      27: new Qbishop(WHITE),
      28: new Qqueen(WHITE),
      29: new Qking(WHITE),
      30: new Qbishop(WHITE),
      31: new Qknight(WHITE),
      32: new Qrook(WHITE),
    }

  const entanglements = {
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
    22: null,
    23: null,
    24: null,
    25: null,
    26: null,
    27: null,
    28: null,
    29: null,
    30: null,
    31: null,
    32: null,
  }

  const board = [
                null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null,
                17, 18, 19, 20, 21, 22, 23, 24,
                25, 26, 27, 28, 29, 30, 31, 32
              ];

  return [board, pieces, entanglements]
}


/**
NOT IMPLEMENTED
**/
function loadScenario(scenario){
  return [[], [], []];
}
