import React from "react";
import "./ChessBoard.css";
import QuantumBoard from  "../../datatypes/QuantumBoard";
import {sendMsg} from "../../api";
import Tooltip from "./Tooltip.js";


const WHITE = 0;
const BLACK = 1;
const VISUALLY_DISTINCT = ["#a52a2a", "#006400", "#b8860b", "#ff0000", "ffff00",
"00ff00", "#00ffff", "0000ff", "ff00ff", "#1e90ff", "#98fb98", "#ffdab9", "#ffa500",
"#bdb76b", "#191970", "#afeeee"]


class ChessBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      interacteable: false,
      size: 0,
      board: [],
      highlighted: [],
      in_check_highlighted: [],
      toolTipx: 0,
      toolTipy: 0,
      hoverPiece: null,
      selectedPiece: null,
      tooltip: "",
      dragging:false,
      awaitingResponse: false,
      player: WHITE,
      userMarkedTiles: new Set(),
      userMarkedArrows: [],
      startArrow: null,
      currentArrow: null,
      arrows: new Set(),
      visible: false,
      hoverPieceId: 0,
    }
    this.canvas = React.createRef();
    this.main = this.props.main;
  }

  componentDidMount(){
    //create new board
    const board = new QuantumBoard(this.props.scenario, this.props.fullBoard);
    console.time("stringify")
    const x = board.toJSON();
    console.timeEnd("stringify")
    console.log("length of board JSON", JSON.stringify(x).length)
    console.log("board to JSON", x);
    console.log(JSON.stringify(x))
    const incheck_state = board.inCheck(this.state.player);
    const in_check_highlighted = [];
    in_check_highlighted.push(...incheck_state.ally_squares);
    in_check_highlighted.push(...incheck_state.foe_squares);

    //set up canvas
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    var size = Math.min(w,h)*0.90;
    const canvas = this.canvas.current;
    canvas.oncontextmenu = function(e){e.preventDefault(); e.stopPropagation();}
    size = Math.max(200, size);
    size = Math.min(550, size);
    canvas.width = size;
    canvas.height = size;

    //draw board
    var flipped = this.state.player === BLACK;

    this.setState({size: size, board: board, in_check_highlighted: in_check_highlighted, flipped: flipped})

    //set up window events
    window.addEventListener("resize", () => this.onResize() )
    window.requestAnimationFrame(() => this.animate());
  }

  ResetBoard(){
    const board = new QuantumBoard(this.props.scenario, this.props.fullBoard);
    this.setState({board:board})
  }


  animate(){
    this.drawBoard(this.state.board, this.state.flipped);
    if(this.state.hoverPiece) this.setState({visible: true})
    else{ this.setState({visible: false})};
    requestAnimationFrame(() => this.animate())
  }

  onResize(){
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    var size = Math.min(w,h) * 0.90;

    const canvas = this.canvas.current;
    if(!canvas) return;
    size = Math.max(200, size);
    size = Math.min(550, size);
    canvas.width = size;
    canvas.height = size;
    this.setState({size:size});

  }

  drawBoard(board, flipped){
      //draw initialBoard
      const canvas = this.canvas.current;
      if(!canvas){
        //canvas is probably re-rendering
        return;
      }
      const ctx = canvas.getContext("2d");
      if(!ctx){
        console.log("canvas context is undefined, Unexpected");
        return;
      }
      var constant = 0;
      var d = -1;
      if(flipped) {
        constant = canvas.width*(7/8);
        d = +1;
      }
      ctx.clearRect(0,0, canvas.width, canvas.width);
      const SIZE = canvas.width/8;
      // draw board
      for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
          if((i + j)%2 === 0){
            ctx.fillStyle = "#EAE3C9";
          }
          if((i+j)%2 === 1){
            ctx.fillStyle = "#A67A5B";
          }
          ctx.beginPath();
          ctx.fillRect(constant-d*i*SIZE, constant-d*j*SIZE, SIZE, SIZE);
          ctx.closePath();
        }
      }
      if(this.main.state.highlight_check)this.drawInCheck(ctx, SIZE, flipped);
      if(this.main.state.mark) this.drawMarked(ctx, SIZE, flipped);
      if(this.main.state.highlight) this.drawLegal(ctx, SIZE, flipped);
      if(this.main.state.mark) this.drawMarked(ctx, SIZE, flipped);
      if(this.main.state.drawArrow) this.drawArrows(ctx, SIZE, flipped);
      if(this.main.state.drawArrow) this.drawCurrentArrow(ctx, SIZE, flipped);
      this.drawPieces(ctx, board, SIZE, flipped);
  }

  /**
  Updates the response from the backend, after processing move
  @param rsp the JSON string response
  **/
  updateBoard(rsp){
    console.log("updating board...");
    const cur_player = this.state.board.player;
    //parseJSONdata
    this.state.board.update();
    //use JSON data fields as necessary to update states of the board



    //checks the unlikely scenario where a knight flipped a piece to put the king into check
    const check_outcomes = this.state.board.inCheck(cur_player);
    if(check_outcomes.ally) {
      var player = cur_player === BLACK? "White": "BLACK";
      var message = `${player} has won!`;
      //open modal
      alert(message)
    }
    //this.setState()
    this.state.board.nextPlayer();
    this.setState({awaitingResponse: false});
  }

  drawLegal(ctx, size, flipped){
    var constant = 0;
    var d = -1;
    if(flipped){
      constant = size*7;
      d = 1;
    }

    const highlighted = this.state.highlighted;
    for(let i = 0; i < highlighted.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgba(0,255,0,0.5)";
      const x = highlighted[i]%8;
      const y = Math.floor(highlighted[i]/8)

      ctx.fillRect(constant - d*x*size, constant - d*y*size, size, size);
      ctx.fill();
      ctx.closePath();
    }
  }

  drawMarked(ctx, size, flipped){
    var constant = 0;
    var d = -1;
    if(flipped){
      constant = size*7;
      d = 1;
    }

    const marked = this.state.userMarkedTiles;
    marked.forEach((tile) => {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,255,0,0.5)";
      const x = tile%8;
      const y = Math.floor(tile/8)

      ctx.fillRect(constant - d*x*size, constant - d*y*size, size, size);
      ctx.fill();
      ctx.closePath();
    });
  }

  drawCurrentArrow(ctx, size, flipped){
    var constant = 0;
    var d = -1;
    if(flipped){
      constant = size*7;
      d = 1;
    }

    const elems = [this.state.startArrow, this.state.currentArrow];
    if(elems[0] === null || elems[1] === null || elems[0] === elems[1] ) return;
    var startX = elems[0]%8;
    var startY = Math.floor(elems[0]/8)
    var endX = elems[1]%8;
    var endY = Math.floor(elems[1]/8);
    startX = constant - d*(startX*size + size/2);
    startY = constant -d*(startY*size + size/2);
    endX = constant - d*(endX*size + size/2);
    endY = constant - d*(endY*size + size/2);
    drawArrow(ctx, startX, startY, endX, endY)
  }

  drawArrows(ctx, size, flipped){
    var constant = 0;
    var d = -1;
    if(flipped){
      constant = size*7;
      d = 1;
    }

    const arrows = this.state.arrows;
    arrows.forEach((elems) => {
      var startX = elems[0]%8;
      var startY = Math.floor(elems[0]/8)
      var endX = elems[1]%8;
      var endY = Math.floor(elems[1]/8);
      startX = constant - d*(startX*size + size/2);
      startY = constant -d*(startY*size + size/2);
      endX = constant - d*(endX*size + size/2);
      endY = constant - d*(endY*size + size/2);
      drawArrow(ctx, startX, startY, endX, endY)
    });
  }

  drawInCheck(ctx, size, flipped){
    var constant = 0;
    var d = -1;
    if(flipped){
      constant = size*7;
      d = 1;
    }

    const incheck_highlighted = this.state.in_check_highlighted;
    for(let i = 0; i < incheck_highlighted.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgba(255,0,0,0.5)";
      const x = incheck_highlighted[i]%8;
      const y = Math.floor(incheck_highlighted[i]/8)
      ctx.fillRect(constant - d*x*size, constant-d*y*size, size, size);
      ctx.fill();
      ctx.closePath();
    }
  }

  drawPieces(ctx, board, size, flipped){

    const positions = board.board;
    const moving_id = this.state.selectedPiece;



    for(let i = 0; i < positions.length; i++){
      if(positions[i]){
        const id = positions[i];
        const piece = board.pieces[positions[i]];
        if(id !== moving_id)this.drawPieceText(ctx, piece,size, i%8 * size, (Math.floor(i/8)+1) * size, flipped )

        if(!board.entanglements[id]){
          //DRAW ENTAGLEMENTS
        }
        else{
          //DRAW ENTANGLEMENTS
        }
      }
    }
    if(moving_id){
      for(let i = 0; i < positions.length; i++){
        if(positions[i]){
          const id = positions[i];
          const piece = board.pieces[positions[i]];
          if(id === moving_id){ this.drawPieceText(ctx, piece, size, this.state.selectedX-size/2, this.state.selectedY+size/2)}


          if(!board.entanglements[id]){
            //DRAW ENTAGLEMENTS
          }
          else{
            //DRAW ENTANGLEMENTS
          }
        }
      }
    }
  }

  drawPieceText(ctx, piece, size, x, y, flipped){
    piece.drawPiece(ctx, size, x, y, flipped)
  }

  getMouseLocation(e){
    const canvas = this.canvas.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x,y]
  }

  getSquare(e){
    var constant = 0;
    var d = -1;
    if(this.state.flipped){
      constant = this.canvas.current.width;
      d = +1;
    }
    const canvas = this.canvas.current;
    const SIZE = canvas.width/8;
    const rect = canvas.getBoundingClientRect();
    const x = constant - d*(e.clientX - rect.left);
    const y = constant -d*(e.clientY - rect.top);
    return Math.floor(x/SIZE)+ 8*Math.floor(y/SIZE);
  }

  showToolTip(e){
    const square = this.getSquare(e)
    const id = this.state.board.getID(square);
    if(id !== 0 ){
      const piece = this.state.board.pieces[id];
      const [x,y] = this.getMouseLocation(e);
      const size = this.canvas.current.width/8;
      if(id !== this.state.hoverPieceId && piece !== undefined) {
        const data = piece.getProbabilities();
        this.setState({hoverPiece:data, hoverPieceId: id, toolTipx: x, toolTipy: y+size/2});
      }

      this.setState({ toolTipx: x, toolTipy: y+size/2});
    }
    else if(id === 0){
      this.setState({hoverPiece:null, hoverPieceId: 0})
    }
  }

  updateHighlighted(e){
    const square = this.getSquare(e)
    const id = this.state.board.getID(square);
    const [x,y] = this.getMouseLocation(e)
    console.log("id of piece selected", id);
    var highlighted;
    if(id){
      const piece = this.state.board.getPiece(id);
      var legal_moves = piece.getLegalMoves(id, square, this.state.board);

      if(piece.isTrueKing()){
        const color = piece.color;
        const other_color = color === WHITE? BLACK: WHITE;
        var remove_moves = new Set();
        const board_without_king = this.state.board.copy();
        const index = board_without_king.board.indexOf(parseInt(id));
        board_without_king.board[index] = null;
        // delete board_without_king.pieces[id];
        // delete board_without_king.entangled[id];
        for(var opp_piece in this.state.board.pieces){
          if(this.state.board.pieces[opp_piece].color === other_color){
            const other_moves = board_without_king.pieces[opp_piece].getLegalMoves(
              opp_piece,
              board_without_king.board.indexOf(parseInt(opp_piece)),
              board_without_king,
              true
            );
            other_moves.forEach(item => remove_moves.add(item));
          }
        }

        legal_moves = legal_moves.filter(x => !remove_moves.has(x));
      }
      highlighted = legal_moves;
      // console.log("legalmoves", legal_moves)
    }
    else{
      highlighted = [];
    }
    return [highlighted, id, x, y];
  }

  setDrag(e,v){
    if(e.button === 0 && !this.state.awaitingResponse && this.state.interacteable){
      this.setState({
        userMarkedTiles: new Set(),
        arrows: new Set(),
        startArrow: null,
        currentArrow: null,
        hoverPiece: null,
        hoverId: 0});
      if(v && this.state.board.player === this.state.player){
        const [highlighted, id, x, y] = this.updateHighlighted(e)
        console.log(highlighted, id, x, y);
        if(id === null) return;
        if(this.state.board.pieces[id] === undefined) return;
        if(this.state.board.pieces[id].color !== this.state.player) return;
        this.setState({dragging:true, selectedPiece: id, selectedX: x, selectedY:y,
          highlighted: highlighted, moveStart: this.getSquare(e)});
      }
      else{
        if(this.state.selectedPiece && !this.state.awaitingResponse){
          this.sendMove(this.state.moveStart, this.getSquare(e), this.state.highlighted);
        }
        this.setState({dragging: false, selectedPiece: null, highlighted: []})
      }
    }
    if(e.button === 1 && !v && this.state.interacteable){
      const square = this.getSquare(e)
      const userMarkedTiles = this.state.userMarkedTiles;
      if(!userMarkedTiles.has(square)){
        this.setState({userMarkedTiles: userMarkedTiles.add(square)})
      }
    }
    if(e.button === 2 && v &&this.state.interacteable ){
      console.log("hello")
      const square = this.getSquare(e)
      this.setState({startArrow: square, hoverPiece: null, hoverId: 0});
    }
    else if(e.button === 2 && !v && this.state.interacteable){
      if(this.state.arrow !== null){
        console.log("goodbye")
        const square = this.getSquare(e);
        if(square != this.state.startArrow){
          this.setState({
            startArrow:null,
            arrows: this.state.arrows.add([this.state.startArrow, square]),
            currentArrow:null
          });
        }
      }
    }
  }

  handleMouseEventsOnCanvas(e){
    if(this.state.dragging === true && this.state.selectedPiece !== null
              && e.button === 0 && this.state.board.player === this.state.player){
      const [x,y] = this.getMouseLocation(e);
      this.setState({selectedX: x, selectedY: y})
    } else if(this.state.startArrow !== null){
      const square = this.getSquare(e)
      this.setState({currentArrow: square});
    } else{
      this.showToolTip(e)
    }
  }

  sendMove(start, end, legal_moves){
    if(start === end) return;
    if(!legal_moves.includes(end)) return;
    if(!this.main.state.gameSocket) {
      console.log("Not connected to a game socket");
      return;
    }
    console.log("move", start, end);
    console.log(this.state.board.toJSON());
    this.setState({awaitingResponse:true})
    sendMsg(this.main.state.gameSocket, this.state.board.toJSON(1, start, end))
  }



  render(){
    const moving = this.state.selectedPiece;
    const component = this.state.hoverPiece !== null? this.state.hoverPiece.map((item,index) => {
          return <Tooltip data = {item} key = {index} ></Tooltip>
        }): <div></div>

    return (
      <div className = "boardArea">
        <canvas ref = {this.canvas} id = "chessBoard"
        style = {{
                  outline: "1px solid black",
                  cursor: this.state.selectedPiece === null? "default": "grabbing"
                }}
        onMouseDown = {(e) => this.setDrag(e,true, false)}
        onMouseMove = {(e) => this.handleMouseEventsOnCanvas(e)}
        onMouseUp = {(e) => {this.setDrag(e,false)}}
                onMouseLeave = {(e) => this.setState({hoverPiece: null, hoverId: 0})}
        className = "chessBoard"
        />
        <div className = "tooltip" hidden = {!this.state.visible}
        style = {{top: this.state.toolTipy, left: this.state.toolTipx, cursor: "default", pointerEvents: "none"}}
        >
          {component}
        </div>
      </div>
    )
  }
}

export default ChessBoard;


function drawArrow(ctx, startX, startY, endX, endY){
 var headlen = 10;
 var dx = endX - startX;
 var dy = endY - startY;
 var angle = Math.atan2(dy, dx);

 ctx.beginPath();
 ctx.strokeStyle = "rgba(255, 165, 0, 0.7)";
 ctx.lineWidth = 5;
 ctx.moveTo(startX, startY);
 ctx.lineTo(endX, endY);
 ctx.stroke();
 ctx.closePath();
 ctx.beginPath();
 ctx.moveTo(endX, endY);
 ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));
 ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 7), endY - headlen * Math.sin(angle + Math.PI / 7));
 ctx.lineTo(endX, endY);
 ctx.lineTo(endX - headlen* Math.cos(angle - Math.PI/7), endY - headlen * Math.sin(angle-Math.PI /7));
 ctx.stroke();
 ctx.fillStyle = "rgba(255, 165, 0, 0.7)";
 ctx.fill();
 ctx.closePath();
 ctx.lineWidth = 1;
}
