import React from "react";
import "./ChessBoard.css";
import QuantumBoard from  "../../datatypes/QuantumBoard";
var FLIPPED = false;

const WHITE = 0;
const BLACK = 1;

class ChessBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      interacteable: this.props.active,
      size: 0,
      board: [],
      highlighted: [],
      toolTipx: 0,
      toolTipy: 0,
      hoverPiece: false,
      selectedPiece: null,
      tooltip: "",
      player: WHITE,
      dragging:false,
    }
    this.canvas = React.createRef();
  }
  componentDidMount(){
    const board = new QuantumBoard(this.props.scenario, this.props.fullBoard);
    console.log(board)
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    var size = Math.min(w,h)*0.90;
    const canvas = this.canvas.current;
    size = Math.max(200, size);
    size = Math.min(596, size);
    canvas.width = size;
    canvas.height = size;
    this.drawBoard(board);
    this.setState({size: size, board: board})
    window.addEventListener("resize", () => this.onResize() )
    window.requestAnimationFrame(() => this.animate());
  }

  animate(){
    this.drawBoard(this.state.board);
    requestAnimationFrame(() => this.animate())
  }

  onResize(){
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    var size = Math.min(w,h) * 0.90;

    const canvas = this.canvas.current;
    if(!canvas) return;
    size = Math.max(200, size);
    size = Math.min(596, size);
    this.setState({size:size});

  }

  drawBoard(board){
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
      const SIZE = canvas.width/8;
      // draw board
      for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
          if((i + j)%2 === 0){
            ctx.fillStyle = "#EAE3C9";
          }
          if((i+j)%2 === 1){
            ctx.fillStyle = "#A67A5B";
          }
          ctx.beginPath();
          ctx.fillRect(i*SIZE, j*SIZE, SIZE, SIZE);
          ctx.closePath();
        }
      }
      if(this.props.highlight) this.drawHighlighted(ctx, SIZE);
      this.drawPieces(ctx, board, SIZE);

  }

  drawHighlighted(ctx, size){
    const highlighted = this.state.highlighted;
    for(let i = 0; i < highlighted.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgba(0,255,0,0.5)";
      const x = highlighted[i]%8;
      const y = Math.floor(highlighted[i]/8)
      ctx.fillRect(x*size, y*size, size, size);
      ctx.fill();
      ctx.closePath();
    }
  }

  drawPieces(ctx, board, size){

    const positions = board.board;
    const moving_id = this.state.selectedPiece;
    for(let i = 0; i < positions.length; i++){
      if(positions[i]){
        const id = positions[i];
        const piece = board.pieces[positions[i]];
        if(id === moving_id){ this.drawPieceText(ctx, piece, size, this.state.selectedX-size/2, this.state.selectedY+size/2)}
        else{this.drawPieceText(ctx, piece,size, i%8 * size, (Math.floor(i/8)+1) * size )}

        if(!board.entanglements[id]){
          //DRAW ENTAGLEMENTS
        }
        else{
          //DRAW ENTANGLEMENTS
        }
      }
    }
  }

  drawPieceText(ctx, piece, size, x, y){
    const unicode = piece.model;
    const color = piece.color === WHITE? "rgb(255,255,255)": "rgb(0,0,0)";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = (size*9/10).toString() + "px serif";
    ctx.fillText(unicode, x, y-size/10);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.font = (size*9/10).toString() + "px serif";
    ctx.strokeText(unicode, x, y-size/10);
    ctx.stroke();
    ctx.closePath();
  }

  getMouseLocation(e){
    const canvas = this.canvas.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x,y]
  }

  getSquare(e){
    const canvas = this.canvas.current;
    const SIZE = canvas.width/8;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return Math.floor(x/SIZE)+ 8*Math.floor(y/SIZE);
  }

  showToolTip(e){
    const square = this.getSquare(e)
    const id = this.state.board.getID(square);
    if(id !== null && this.state.hoverPiece === false){
      const piece = this.state.board.pieces[id].parseTooltip();
      const [x,y] = this.getMouseLocation(e);
      this.setState({hoverPiece:true, toolTipx: x, toolTipy: y, tooltip: piece});
    }
    else{
      this.setState({hoverPiece:false})
    }
  }

  setDrag(e,v){
    if(v){
      const square = this.getSquare(e)
      const id = this.state.board.getID(square);
      const [x,y] = this.getMouseLocation(e)
      console.log("id of piece selected", id);
      var highlighted;
      if(id){
        const legal_moves = this.state.board.getPiece(id).getLegalMoves(id, square, this.state.board);
        highlighted = legal_moves;
        console.log("legalmoves", legal_moves)
      }
      else{
        highlighted = [];
      }
      this.setState({dragging:true, selectedPiece: id, selectedX: x, selectedY:y,
        highlighted: highlighted});
    }
    else{
      console.log(this.getSquare(e));
      this.setState({dragging: false, selectedPiece: null, highlighted: []})
    }

  }

  handleMouseEventsOnCanvas(e){
    if(this.state.dragging === true && this.state.selectedPiece !== null){
      const [x,y] = this.getMouseLocation(e);
      this.setState({selectedX: x, selectedY: y})
    }
  }

  render(){
    const moving = this.state.selectedPiece;
    return (
      <div className = "boardArea">
        <canvas ref = {this.canvas} id = "chessBoard"
        style = {{cursor: this.state.selectedPiece=== null? "grab": "default"}}
        onMouseLeave = {(e) => this.setDrag(e, false)}
        onMouseDown = {(e) => this.setDrag(e,true)}
        onMouseMove = {(e) => this.handleMouseEventsOnCanvas(e)}
        onMouseUp = {(e) => {this.setDrag(e,false)}}
        style = {{ outline: "1px solid black"}}
        className = "chessBoard"
        />
        <div className = "tooltip" hidden = {!this.state.hoverPiece}
        style = {{top: this.state.toolTipy, left: this.state.toolTipx}}
        >
          {this.state.tooltip}
        </div>
      </div>
    )
  }
}

export default ChessBoard;
