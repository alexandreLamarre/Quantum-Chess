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
  constructor(scenario=false, normal = true, custom = false, board = [], pieces = {}, entanglements = {}){
    if(normal){
      const res = defaultQuantumBoard();
      this.board = res[0];
      this.pieces = res[1];
      this.entanglements = res[2];

    }

    else if(scenario){
      [this.board,this.pieces,this.entanglements] = loadScenario(scenario);
    }
    else if(custom){
      this.board = board;
      this.pieces = pieces;
      this.entanglements = entanglements;
    }
  }

  copy(){
    return new QuantumBoard(false, false, true, this.board.slice(), this.pieces, this.entanglements);
  }

  /**
  Called only when sure there is a piece at position
  Returns color of piece
  **/
  getColor(position){
    const id = this.getID(position);
    if(id === null) console.log("FATAL ERROR GET COLOR")
    return this.pieces[id].color;
  }

  /**
  returns piece id at position
  **/
  getID(position){
    if(this.board[position] === undefined) console.log("FATAL ERROR POSITION")
    return this.board[position]
  }

  /**
  Returns Quantum piece object with id id
  **/
  getPiece(id){
    return this.pieces[id];
  }

  update(){

  };

  /**
  Checks whether or not each player is in check
  @param color the friendly color
  **/
  inCheck(color, getMoves = false){
    console.time("check")
    var ally_king_spaces = [];
    var foe_king_spaces = [];
    for(const id in this.pieces){
      const piece = this.pieces[id];
      if(piece.color === color && piece.states["King"] === 1){
        ally_king_spaces.push(this.board.indexOf(parseInt(id)));
      }
      else if(piece.color !== color && piece.states["King"] === 1){
        foe_king_spaces.push(this.board.indexOf(parseInt(id)));
      }
    }
    var ally_moves = new Set();
    var foe_moves = new Set();

    for(const id in this.pieces){
      const piece = this.pieces[id];
      if(piece.color === color){
        const legal_moves = piece.getLegalMoves(
          parseInt(id),
          this.board.indexOf(parseInt(id)),
          this
        );
        legal_moves.forEach(item => ally_moves.add(item));
      }
      else if (piece.color !== color) {
        const legal_moves = piece.getLegalMoves(
        parseInt(id),
        this.board.indexOf(parseInt(id)),
        this,
      );
      legal_moves.forEach(item => foe_moves.add(item));
      }
    }

    var ally_in_check = false;
    var foe_in_check = false;
    var ally_in_check_squares = [];
    var foe_in_check_squares  = [];
    for (let i = 0; i < ally_king_spaces.length; i++){
      if(foe_moves.has(ally_king_spaces[i])){
        ally_in_check = true;
        ally_in_check_squares.push(ally_king_spaces[i]);
      }
    }

    for(let i = 0; i < foe_king_spaces.length; i++){
      if(ally_moves.has(foe_king_spaces[i])){
        foe_in_check = true;
        foe_in_check_squares.push(foe_king_spaces[i])
      }
    }
    console.timeEnd("check")
    // console.log("ally king spaces", ally_king_spaces);
    // console.log("foe king spaces", foe_king_spaces);
    // console.log("ally_moves", ally_moves);
    // console.log("foe_moves", foe_moves);
    console.log("White in check?", (color === WHITE && ally_in_check) || (color === BLACK && foe_in_check));
    console.log("Black in check?", (color === BLACK && ally_in_check) || (color === WHITE && foe_in_check));

    const other_color = color === WHITE? BLACK: WHITE;
    return {ally: ally_in_check, foe: foe_in_check,
            ally_squares:ally_in_check_squares, foe_squares: foe_in_check_squares,
            foe_moves: foe_moves};
      // return [ally_in_check, foe_in_check, ally_in_check_squares, foe_in_check_squares];

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
  //map an id to pieces
  const pieces = {
      1: new Qking(WHITE),
      2: new Qbishop(BLACK),
      3: new Qking(BLACK),
      17: new Qpawn("Rook",WHITE),
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

  // map ids to entanglements
  const entanglements = {
    1: null,
    2: null,
    3: null,
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

  //map board squares to piece ids
  const board = [
                null, null, null, null, null, null, null, null,
                null, null, null, 1, null, 3, null, null,
                null, null, null, null, 2, null, null, null,
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
