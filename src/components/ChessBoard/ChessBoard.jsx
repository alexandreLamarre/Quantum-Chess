import React from "react";
import "./ChessBoard.css";

class ChessBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      size: 0,
      margin_top: 0,
      board: [],
    }
    this.canvas = React.createRef();
  }

  drawBoard(board){
    if(!board){
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
      for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE; j++){
          if((i + j)%2 === 0){
            ctx.fillStyle = "white";
          }
          if((i+j)%2 === 1){
            ctx.fillStyle = "rgba(0,210,0,0.5)";
          }
          ctx.beginPath();
          ctx.fillRect(i*SIZE, j*SIZE, SIZE, SIZE);
          ctx.closePath();
        }
      }
    }
    else{
      // pass for now
      return;
    }
  }

  componentDidMount(){
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    const size = Math.min(w,h)*0.90;
    const margin_top = Math.min(w,h)*0.10/2;

    const canvas = this.canvas.current;
    canvas.width = size;
    canvas.height = size;
    this.drawBoard();
    this.setState({size: size, margin_top: margin_top})
    window.addEventListener("resize", () => this.onResize() )
  }

  onResize(){
    const w = Math.floor(window.innerWidth/2);
    const h = Math.floor(window.innerHeight);
    const size = Math.min(w,h) * 0.90;
    const margin_top = Math.min(w,h)*0.10/2;

    const canvas = this.canvas.current;
    if(!canvas) return;

    canvas.width = size;
    canvas.height = size;
    this.drawBoard();
    this.setState({size:size, margin_top: margin_top});

  }

  render(){
    return (
      <div className = "boardArea">
        <canvas ref = {this.canvas}
        style = {{marginTop: this.state.margin_top, outline: "1px solid black"}}
        className = "chessBoard"
        />
      </div>
    )
  }
}

export default ChessBoard;
