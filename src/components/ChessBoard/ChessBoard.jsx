import React from "react";
import "./ChessBoard.css";
import QuantumBoard from  "../../datatypes/QuantumBoard";


const WHITE = 0;
const BLACK = 1;

class ChessBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      interacteable: this.props.active,
      size: 0,
      board: [],
      toolTipx: 0,
      toolTipy: 0,
      hoverPiece: false,
      tooltip: "",
    }
    this.canvas = React.createRef();
  }
  componentDidMount(){
    const board = new QuantumBoard(this.props.scenario, this.props.fullBoard);
    console.log(board)
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    const size = Math.min(w,h)*0.90;
    const canvas = this.canvas.current;
    canvas.width = size;
    canvas.height = size;
    this.drawBoard(board);
    this.setState({size: size, board: board})
    window.addEventListener("resize", () => this.onResize() )
  }

  onResize(){
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    const size = Math.min(w,h) * 0.90;

    const canvas = this.canvas.current;
    if(!canvas) return;

    canvas.width = size;
    canvas.height = size;
    this.drawBoard(this.state.board);
    this.setState({size:size});
  }

  drawBoard(board){
      //draw initialBoard
      const canvas = this.canvas.current;
      if(!canvas){
        console.log("canvas is undefined, Unexpected");
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
      const positions = board.board;
      for(let i = 0; i < positions.length; i++){
        if(positions[i]){
          const id = positions[i];
          const piece = board.pieces[positions[i]];
          piece.model.onload = ctx.drawImage(piece.model, i%8 *SIZE, Math.floor(i/8) *SIZE, SIZE, SIZE);
          if(!board.entanglements[id]){
            ctx.beginPath();
            ctx.arc(i%8*SIZE + SIZE/2, Math.floor(i/8) * SIZE + SIZE/2, (SIZE/2) *(9/10), 0 , 2*Math.PI, false);
            ctx.arc(i%8*SIZE + SIZE/2, Math.floor(i/8) * SIZE + SIZE/2, (SIZE/2) *(9/10)-4, 0 , 2*Math.PI, true);
            ctx.fillStyle = piece.color === WHITE? "rgb(255,255,255)": "rgb(0,0,0)"
            ctx.fill();
            ctx.closePath();
          }
          // piece.model.onload = ctx.drawImage(piece.model, i%8 *SIZE, i/8 *SIZE, SIZE, SIZE);
        }
      }

  }

  getLocation(e){
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
    return Math.floor(x/SIZE)+ 8*Math.floor(y/SIZE)
  }

  showToolTip(e){
    const square = this.getSquare(e)
    const id = this.state.board.board[square];
    if(id !== null && this.state.hoverPiece === false){
      const piece = this.state.board.pieces[id].parseTooltip();
      const [x,y] = this.getLocation(e);
      this.setState({hoverPiece:true, toolTipx: x, toolTipy: y, tooltip: piece});
    }
    else{
      this.setState({hoverPiece:false})
    }
  }

  render(){
    return (
      <div className = "boardArea">
        <canvas ref = {this.canvas}
        onClick = {(e) => this.getLocation(e)}
        onMouseMove = {(e) => this.showToolTip(e)}
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
