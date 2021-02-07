import React from "react";


class Loader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      sA : (Math.PI / 180) * 45,
      sE: (Math.PI / 180) * 90,
      color: this.props.color,
    }
    this.canvas = React.createRef();
  }

  componentDidMount(){
    // set up canvas,

    var size = Math.min(200, window.innerWidth/4);
    size = Math.max(size, 100);
    const canvas = this.canvas.current;

    canvas.width = size;
    canvas.height = size;
    //register in queue
    window.requestAnimationFrame(() => this.animate())
    window.addEventListener("resize", () => this.resize());

  }

  resize(){
    var size = Math.min(200, window.innerWidth/4);
    size = Math.max(size, 100);
    const canvas = this.canvas.current;
    if(!canvas) return ;
    console.log(size);
    canvas.width = size;
    canvas.height = size;
  }

  drawLoader(canvas){
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    ctx.lineWidth = canvas.width/8;

    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0, 0.3)";
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 5;
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/3, 0, 360, false);
    ctx.stroke();
    ctx.closePath();

    this.state.sE += 0.1;
    this.state.sA += 0.1;

    ctx.beginPath();
    ctx.strokeStyle = this.state.color;
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width/3, this.state.sA, this.state.sE, false);
    ctx.stroke();
    ctx.closePath();
  }

  animate(){
    this.drawLoader(this.canvas.current);

    requestAnimationFrame(() => this.animate())

  }

  render(){

    return(
        <div style = {{display: "flex", justifyContent: "center", marginTop: "5%"}}>
          <canvas className = "loader" ref = {this.canvas} />
        </div>

    )
  }
}

export default Loader;
