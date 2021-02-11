const WHITE = 0;
const BLACK = 1;

const BISHOP_UNICODE = "\u{265D}";
const QUEEN_UNICODE = "\u{265B}"

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
  constructor(stateSpace, initialState, action, color, model, secondary_model){
    this.color = color;
    this.stateSpace = stateSpace;
    this.action = action;
    this.model = model;
    this.secondary_model = secondary_model;
    this.moved = false;
    if(!this.action) this.action = "None";
    if(!stateSpace) {
      this.stateSpace = {};
      console.log("invalid state space for Q-piece")
    }

    if(!initialState || stateSpace.length !== initialState.length){
      console.log("Invalid initial state for Q-piece")
      this.initialState = {};
      this.states = this.initialState;
     }
     else{
       this.initialState = {};
       let i = 0;
       this.stateSpace.forEach(key => this.initialState[key] = initialState[i++])
       this.states = this.initialState;
     }
  }

  toJSON(){
    return {color: this.color, stateSpace: this.stateSpace, action: this.action,
            initialState: this.initialState, states: this.states, moved: this.moved}
  }

  drawPiece(ctx, size, x,y, flipped){
    const [primaryActivated, secondaryActivated] = this.getActivatedStates();
    let constantX = 0;
    let constantY = 0;
    let d = -1;
    if(flipped){
      constantX = size*7
      constantY = size*9;
      d = +1;
    }
    if(primaryActivated && secondaryActivated){
      this.drawTwo(ctx, size, x, y, flipped, this.model, 8/9, -1/10,
          this.secondary_model, 8/9, 3/7, constantX, constantY, d)
    } else if(primaryActivated && !this.isTrueKing() && !secondaryActivated) {
      // draw2 scale1 6/7 offset1 0.0 scale2 3/7 offset2 4/7
      this.drawTwo(ctx, size, x, y, flipped, this.model, 6/7, 0.0,
          this.secondary_model, 3/7, 4/7, constantX, constantY, d);
    }else if(!primaryActivated && !this.isTrueKing() && secondaryActivated){
      //draw2  scale1 3/7 offset1 1/7 scale2 6/7 offset2 2/7
      this.drawTwo(ctx, size, x, y, flipped, this.model, 3/7,
          1/7, this.secondary_model, 6/7, 2/7,
          constantX, constantY, d)
    }else
      {
        this.draw(ctx, size, x, y, flipped, this.model);
    }

  }

  draw(ctx, size, x, y, flipped, unicode){
    let constantX = 0;
    let constantY = 0;
    let d = -1;
    if(flipped){
      constantX = size*7
      constantY = size*9;
      d = +1;
    }
    const color = this.color === WHITE? "rgb(255,255,255)": "rgb(0,0,0)";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = (size*9/10).toString() + "px serif";
    ctx.fillText(unicode, constantX - d*x, constantY-d*(y)-size/10);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font = (size*9/10).toString() + "px serif";
    ctx.strokeText(unicode, constantX - d*x, constantY - d*(y)-size/10);
    ctx.stroke();
    ctx.closePath();
  }

  drawTwo(ctx, size, x, y, flipped, unicode, scale1, offset1, unicode2, scale2, offset2, constantX, constantY, d){
    let offsetY = 0;
    if(unicode === BISHOP_UNICODE) {
      scale1 *= 7/9;
      offsetY -= size*(1/15);
      offset1 += 1/10;
    }
    if(unicode === QUEEN_UNICODE){

      offset1+=1/30;
      offsetY -= size*(1/50)
    }
    const color = this.color === WHITE? "rgb(255,255,255)": "rgb(0,0,0)";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = ((size*9/10)*(scale1)).toString() + "px serif";
    ctx.fillText(unicode, constantX - d*x +((size*9/10)*offset1), constantY-d*(y)-size/10 + offsetY, ((size*9/10)*(scale1)));
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font = ((size*9/10)*(scale1)).toString() + "px serif";
    ctx.strokeText(unicode, constantX - d*x + ((size*9/10)*offset1), constantY - d*(y)-size/10 + offsetY, ((size*9/10)*(scale1)));
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    // const unicode2 = this.secondary_model;
    ctx.fillStyle = color;
    ctx.font = ((size*9/10)*scale2).toString() + "px serif";
    ctx.fillText(unicode2, constantX - d*x +((size*9/10)*(offset2)), constantY-d*(y)-size/10, ((size*9/10)*(scale2)));
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font = ((size*9/10)*scale2).toString() + "px serif";
    ctx.strokeText(unicode2, constantX - d*x + +((size*9/10)*(offset2)), constantY - d*(y)-size/10, ((size*9/10)*(scale2)));
    ctx.stroke();
    ctx.closePath();
  }

  getActivatedStates(){
    let one = false;
    let two = false;
    if(this.stateSpace.length == 1) return [false,false]
    if( this.notZero(this.states[this.stateSpace[0]])) one = true;
    if( this.notZero(this.states[this.stateSpace[1]])) two = true;
    return [one,two];
  }


  /**
   * Checks if a state in complex number form: [float, float]
   * is non-zero
   * **/
  notZero(complex){
    return complex[0] !== 0.0 || complex[1] !== 0.0;

  }

  /**
   * Returns the modulus of a complex number in the form: [float, float]
   * @param complex: [float, float] the complex number whose modulus we want to find.
   * **/
  _modulus(complex){
    return Math.sqrt(Math.pow(complex[0], 2) + Math.pow(complex[1], 2));
  }

  /**
   * Gets probabilities of measuring states of this quantum piece.
   * **/
  getProbabilities(){
    const probabilities = [];
    if(this.stateSpace.length == 1){
      return [{state: "King", model: this.model, probability: 100}]
    }
    for(let i = 0; i < this.stateSpace.length; i ++){
      let model;
      if(i === 0) model = this.model;
      else if (i === 1) model = this.secondary_model;
      probabilities.push({
        state: this.stateSpace[i],
        probability: (Math.pow(this._modulus(this.states[this.stateSpace[i]]),2)*100).toFixed(2),
        model: model})
    }
    return probabilities;
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
  @param capture indicates whether or not the piece has moves that change if it can make a capture
  **/
  getLegalMoves(id,position, board, capture = false){
    let states;
    const legal_moves = [];
    states = this.states;
    for(const state in states){
      if(this.notZero(states[state]) ){
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

    if(board.getID(l) === 0) legal_moves.push(l);
    else{
      const piece_color = board.getColor(l);
      if(color !== piece_color) legal_moves.push(l);
    }
  }
  if(cur_row === getRow(r) && inBoard(r)){

    if(board.getID(r) === 0) legal_moves.push(r);
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
    if(board.getID(l) === 0) legal_moves.push(l);
    else if(board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(board.getID(m) === 0) legal_moves.push(m);
  else if(board.getColor(m) !== color){
    legal_moves.push(m);
  }
  if(inBoardRow(getRow(r)) && u_row === getRow(r)){
    if(board.getID(r) === 0) legal_moves.push(r);
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
    if(board.getID(l) === 0) legal_moves.push(l);
    else if(board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(inBoard(m) && board.getID(m) === null) legal_moves.push(m);
  else if(inBoard(m) && board.getColor(m) !== color){
    legal_moves.push(m);
  }
  if(inBoardRow(getRow(r)) && l_row === getRow(r)){
    if(board.getID(r) === 0) legal_moves.push(r);
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
    if(board.getID(l) !== 0 && board.getColor(l) !== color){
      legal_moves.push(l);
    }
  }
  if(capture_row === getRow(r) && inBoard(r)){
    if(board.getID(r) !== 0 && board.getColor(r) !== color){
      legal_moves.push(r);
    }
  }
}

function checkForward(position, dy, color, board, legal_moves){
  for(let i = 0; i < Math.abs(dy); i++){
    const next_row = getRow(position) + (i+1)*Math.sign(dy);
    const next_pos = next_row*8 + position%8;
    if(board.getID(next_pos) === 0) legal_moves.push(next_pos);
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
      if(board.getID(l) === 0 || board.getColor(l) !== color){
        legal_moves.push(l);
      }
    }
    if(inBoard(r) && getRow(r) === upper_row){
      if(board.getID(r) === 0 || board.getColor(r) !== color){
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
      if(board.getID(l) === 0 || board.getColor(l) !== color){
        legal_moves.push(l);
      }
    }
    if(inBoard(r) && getRow(r) === lower_row){
      if(board.getID(r) === 0 || board.getColor(r) !== color){
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
    if(board.getID(u) === 0 || board.getColor(u) !== color){
      legal_moves.push(u);
    }
  }
  if(inBoardRow(l_row) && getRow(l) === l_row && inBoard(l)){
    if(board.getID(l) === 0 || board.getColor(l) !== color){
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
    if(board.getID(u) === 0 || board.getColor(u) !== color){
      legal_moves.push(u);
    }
  }
  if(inBoardRow(l_row) && getRow(l) === l_row && inBoard(l)){
    if(board.getID(l) === 0 || board.getColor(l) !== color){
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position);
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

  if(board.getID(position) === 0) legal_moves.push(position)
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

  if(board.getID(position) === 0) legal_moves.push(position)
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
