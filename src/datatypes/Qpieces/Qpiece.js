const WHITE = 0;
const BLACK = 1;

/**
Super class of all Quantum Pieces aka Q-pieces.
**/
class Qpiece{
  /**
  @param color int WHITE == 0, BLACK == 1
  @param stateSpace set of states which are represented as strings
  @param initialState array of floats of initial state values,
        !!! MUST match insertion order of state space !!!
  @param action string describing action of Qpiece
  @param model image object for the qpiece
  **/
  constructor(stateSpace, initialState, action, color, model){
    this.color = color;
    this.stateSpace = stateSpace;
    this.action = action;
    this.model = model;
    this.moved = false;
    if(!this.action) this.action = "None";
    if(!stateSpace) {
      this.stateSpace = {};
      console.log("invalid state space for Q-piece")
    }

    if(!initialState || stateSpace.size !== initialState.length){
      console.log("Invalid initial state for Q-piece")
      this.initialState = {};
      this.states = this.initialState;
     }
     else{
       this.initialState = {};
       var i = 0;
       this.stateSpace.forEach(key => this.initialState[key] = initialState[i++])
       this.states = this.initialState;
     }
  }

  toJSON(){
    return {color: this.color, stateSpace: this.stateSpace, action: this.action,
            initialState: this.initialState, states: this.states}
  }

  parseTooltip(){
    return (
    `
    Initial state: ${this.initialState} \n
    Quantum Circuit/action: ${this.action} \n
    `)
  }

  isTrueKing(){
    for(const state in this.states){
      if(state === "King" && this.states[state] === 1) return true;
    }
    return false;
  }

  /**
  @param id id of the piece that we select
  @param position the position on the board of the piece that we select
  @param board the quantum board everything takes place on
  **/
  getLegalMoves(id,position, board, capture = false){
    var states;
    const legal_moves = [];
    states = this.states;
    for(const state in states){
      if(states[state] > 0){
        this._getLegalMoveHelper(state, position, board, legal_moves, capture);
      }
    }
    return legal_moves;
  }

  /**
  @param type the type of piece being considerer in string format:
              One of : "Pawn", "Rook", "Bishop", "Knight", "Queen", "King";
  @param position the position of the piece on the board  0 =< position < 64
  @param board the quantum board
  **/
  _getLegalMoveHelper(type, position, board, legal_moves, capture){
    if(type === "Pawn"){
      pawnMoves(position, this.color, this.moved, board, legal_moves, capture);
    }
    else if(type === "Rook"){
      rookMoves(position, this.color, board, legal_moves);
    }
    else if(type === "Bishop"){
      bishopMoves(position, this.color, board, legal_moves);
    }
    else if(type === "Knight"){
      knightMoves(position, this.color, board, legal_moves);
    }
    else if(type === "King"){
      kingMoves(position, this.color, board, legal_moves);
    }
    else if(type === "Queen"){
      rookMoves(position, this.color, board, legal_moves);
      bishopMoves(position, this.color, board, legal_moves);
    }
  }


}


export default Qpiece;

function kingMoves(position, color, board, legal_moves){
  checkLeftRightKing(position, color, board, legal_moves);
  checkUpperRowKing(position, color, board, legal_moves);
  checkLowerRowKing(position, color, board, legal_moves);
}

function pawnMoves(position, color, moved, board, legal_moves, capture){
  if(color === WHITE){
    checkCapture(position, -1, color, board, legal_moves);
    const dy = moved === false? -2: -1;
    if(capture === false ) checkForward(position, dy, color, board, legal_moves);
  }
  if(color === BLACK){
    checkCapture(position, 1, color, board, legal_moves);
    const dy = moved === false? 2: 1;
    if(capture === false) checkForward(position, dy, color, board, legal_moves);
  }
}

function knightMoves(position, color, board, legal_moves){
  checkUpperKnight(position, color, board, legal_moves);
  checkLowerKnight(position, color, board, legal_moves);
  checkLeftKnight(position, color, board, legal_moves);
  checkRightKnight(position, color, board, legal_moves);
}

function rookMoves(position, color, board, legal_moves){
  const row = getRow(position);
  CheckHorizontalLeft(position -1, row, color, board, legal_moves);
  CheckHorizontalRight(position + 1, row, color, board, legal_moves)
  checkVerticalUp(position -8, color, board, legal_moves);
  checkVerticalDown(position + 8, color, board, legal_moves);
}

function bishopMoves(position, color, board, legal_moves){
  checkUpperLeftDiagonal(upperLeftDiagonal(position), color, board, legal_moves);
  checkUpperRightDiagonal(upperRightDiagonal(position), color, board, legal_moves);
  checkLowerLeftDiagonal(lowerLeftDiagonal(position), color, board, legal_moves);
  checkLowerRightDiagonal(lowerRightDiagonal(position), color, board, legal_moves);
}


// ====================== CHECK KING ========================================

function checkLeftRightKing(position, color, board, legal_moves){
  if(!inBoard(position)) return;
  const cur_row = getRow(position);
  const l = 8*cur_row + position%8 - 1;
  const r = 8*cur_row + position%8 + 1;
  if(cur_row === getRow(l) && inBoard(l)){

    if(board.getID(l) === null) legal_moves.push(l);
    else{
      const piece_color = board.getColor(l);
      if(color !== piece_color) legal_moves.push(l);
    }
  }
  if(cur_row === getRow(r) && inBoard(r)){

    if(board.getID(r) === null) legal_moves.push(r);
    else{
      const piece_color = board.getColor(r);
      if(color !== piece_color) legal_moves.push(r);
    }
  }
}

function checkUpperRowKing(position, color, board, legal_moves){
  const u_row = getRow(position) -1;
  if(!inBoardRow(u_row)) return;
  const l = u_row*8 +position%8 -1;
  const m = u_row*8 + position%8;
  const r = u_row*8 + position%8 + 1;
  if(inBoardRow(getRow(l)) && u_row === getRow(l)){
    if(board.getID(l) === null) legal_moves.push(l);
    else if(board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(board.getID(m) === null) legal_moves.push(m);
  else if(board.getColor(m) !== color){
    legal_moves.push(m);
  }
  if(inBoardRow(getRow(r)) && u_row === getRow(r)){
    if(board.getID(r) === null) legal_moves.push(r);
    else if(board.getColor(r) !== color){
      legal_moves.push(r);
    }
  }

}

function checkLowerRowKing(position, color, board, legal_moves){
  const l_row = getRow(position) + 1;
  if(!inBoardRow(l_row)) return;
  const l = l_row*8 +position%8 -1;
  const m = l_row*8 + position%8;
  const r = l_row*8 + position%8 + 1;
  if(inBoardRow(getRow(l)) && l_row === getRow(l)){
    if(board.getID(l) === null) legal_moves.push(l);
    else if(board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(inBoard(m) && board.getID(m) === null) legal_moves.push(m);
  else if(inBoard(m) && board.getColor(m) !== color){
    legal_moves.push(m);
  }
  if(inBoardRow(getRow(r)) && l_row === getRow(r)){
    if(board.getID(r) === null) legal_moves.push(r);
    else if(board.getColor(r) !== color){
      legal_moves.push(r);
    }
  }
}


// ====================== CHECK PAWN =======================================

function checkCapture(position, dy, color, board, legal_moves){
  if(!inBoard(position)) return;
  const capture_row = getRow(position) + dy;
  if(!inBoardRow(capture_row)) return;

  const l = capture_row * 8 + (position%8)- 1;
  const r = capture_row * 8 + (position%8)+ 1;
  if(capture_row === getRow(l) && inBoard(l)){
    if(board.getID(l) !== null && board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(capture_row === getRow(r) && inBoard(r)){
    if(board.getID(r) !== null && board.getColor(r) !== color){
      legal_moves.push(r);
    }
  }
}

function checkForward(position, dy, color, board, legal_moves){
  for(let i = 0; i < Math.abs(dy); i++){
    const next_row = getRow(position) + (i+1)*Math.sign(dy);
    const next_pos = next_row*8 + position%8;
    if(board.getID(next_pos) === null) legal_moves.push(next_pos);
    else{
      break;
    }
  }
}


// ====================== CHECK KINGHT ======================================

function checkUpperKnight(position, color, board, legal_moves){
  if(!inBoard(position)) return;
  const upper_row = getRow(position) -2;
  if(inBoardRow(upper_row)){
    const l = upper_row*8 +position%8 - 1;
    const r = upper_row*8 +position%8 + 1;
    if(inBoard(l) && getRow(l) === upper_row){
      if(board.getID(l) === null || board.getColor(l) !== color){
        legal_moves.push(l);
      }
    }
    if(inBoard(r) && getRow(r) === upper_row){
      if(board.getID(r) === null || board.getColor(r) !== color){
        legal_moves.push(r);
      }
    }
  }
}

function checkLowerKnight(position, color, board, legal_moves){
  if(!inBoard(position)) return;
  const lower_row = getRow(position) +2;
  if(inBoardRow(lower_row)){
    const l = lower_row*8 +position%8 - 1;
    const r = lower_row*8 +position%8 + 1;
    if(inBoard(l) && getRow(l) === lower_row){
      if(board.getID(l) === null || board.getColor(l) !== color){
        legal_moves.push(l);
      }
    }
    if(inBoard(r) && getRow(r) === lower_row){
      if(board.getID(r) === null || board.getColor(r) !== color){
        legal_moves.push(r);
      }
    }
  }
}
function checkLeftKnight(position, color, board, legal_moves){
  if(!inBoard(position)) return;
  const u_row = getRow(position) -1;
  const l_row = getRow(position) + 1;
  const u = u_row*8 +position%8 -2;
  const l = l_row*8 + position%8 -2;
  if(inBoardRow(u_row) && getRow(u) === u_row && inBoard(u)){
    if(board.getID(u) === null || board.getColor(u) !== color){
      legal_moves.push(u);
    }
  }
  if(inBoardRow(l_row) && getRow(l) === l_row && inBoard(l)){
    if(board.getID(l) === null || board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
}

function checkRightKnight(position, color, board, legal_moves){
  if(!inBoard(position)) return;
  const u_row = getRow(position) -1;
  const l_row = getRow(position) + 1;
  const u = u_row*8 +position%8 +2;
  const l = l_row*8 + position%8 +2;
  if(inBoardRow(u_row) && getRow(u) === u_row && inBoard(u)){
    if(board.getID(u) === null || board.getColor(u) !== color){
      legal_moves.push(u);
    }
  }
  if(inBoardRow(l_row) && getRow(l) === l_row && inBoard(l)){
    if(board.getID(l) === null || board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
}

// ======================= DIAGONAL HELPERS ===================================

function upperLeftDiagonal(position){
  const next_row = getRow(position)-1;
  const next_index = next_row*8 + (position%8-1);
  if(getRow(next_index) === next_row) return next_index;

  return -1;
}

function upperRightDiagonal(position){
  const next_row = getRow(position)-1;
  const next_index = next_row*8 + (position%8+1);
  if(getRow(next_index) === next_row) return next_index;

  return -1;
}

function lowerLeftDiagonal(position){
  const next_row = getRow(position)+1;
  const next_index = next_row*8 + (position%8-1);
  if(getRow(next_index) === next_row) return next_index;

  return -1;
}

function lowerRightDiagonal(position){
  const next_row = getRow(position)+1;
  const next_index = next_row*8 + (position%8+1);
  if(getRow(next_index) === next_row) return next_index;

  return -1;
}


// ======================= UPPER DIAGONAL CHECKS ===============================

function checkUpperLeftDiagonal(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.pieces[board.getID(position)].color === color) return; //friendly piece blocking
    else{ // capture enemy piece
      legal_moves.push(position);
      return;
    }
  }
  checkUpperLeftDiagonal(upperLeftDiagonal(position), color, board, legal_moves);
}

function checkUpperRightDiagonal(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.getColor(position) === color) return; //friendly piece blocking
    else{ // capture enemy piece
      legal_moves.push(position);
      return;
    }
  }
  checkUpperRightDiagonal(upperRightDiagonal(position), color, board, legal_moves);
}


// ========================== LOWER DIAGONAL CHECKS ===============================
function checkLowerLeftDiagonal(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.getColor(position) === color) return; //friendly piece blocking
    else{ // capture enemy piece
      legal_moves.push(position);
      return;
    }
  }
  checkLowerLeftDiagonal(lowerLeftDiagonal(position), color, board, legal_moves);
}



function checkLowerRightDiagonal(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.getColor(position) === color) return; //friendly piece blocking
    else{ // capture enemy piece
      legal_moves.push(position);
      return;
    }
  }
  checkLowerRightDiagonal(lowerRightDiagonal(position), color, board, legal_moves);
}


// =========================== HORIZONTAL CHECKS ==============================


function CheckHorizontalLeft(position, row, color, board, legal_moves){
  if(!inBoard(position)) return;
  const cur_row = getRow(position);
  if(cur_row !== row) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.getColor(position) === color) return; // square is occupied
    else{ //square is a capture
      legal_moves.push(position);
      return;
    }
  }
  CheckHorizontalLeft(position -1, row, color, board, legal_moves);
}

function CheckHorizontalRight(position, row, color, board, legal_moves){
  if(!inBoard(position)) return;
  const cur_row = getRow(position);
  if(cur_row !== row) return;

  if(board.getID(position) === null) legal_moves.push(position);
  else{
    if(board.getColor(position) === color) return; // square is occupied
    else{ //square is a capture
      legal_moves.push(position);
      return;
    }
  }
  CheckHorizontalRight(position +1, row, color, board, legal_moves);
}


// ============================ VERTICAL CHECKS ================================

function checkVerticalDown(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position)
  else{
    if(board.getColor(position) === color) return;
    else{
      legal_moves.push(position);
      return;
    }
  }
  checkVerticalDown(position + 8, color, board, legal_moves); // check vertical "up" moves
}


function checkVerticalUp(position, color, board, legal_moves){
  if(!inBoard(position)) return;

  if(board.getID(position) === null) legal_moves.push(position)
  else{
    if(board.getColor(position) === color) return;
    else{
      legal_moves.push(position);
      return;
    }
  }
  checkVerticalUp(position - 8, color, board, legal_moves); //check vertical "down" moves
}


// ============================== GENERAL HELPERS ==============================

/**

**/
function getRow(position){
  return Math.floor(position/8)
}

/**

**/
function inBoardRow(row){
  return row >= 0 && row < 8;
}

/**
Checks whether position is in the 1d board array, 0 <= position < 64
**/
function inBoard(position){
  return position >= 0 && position < 64;
}
