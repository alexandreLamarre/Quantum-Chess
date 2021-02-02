import React from "react";
import "./MoveLog.css";
import Header from "../Header";


class MoveLog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      moves: [],
    }
  }

  addMove(move){
    // implement some function to add moves
  }

  render(){
    const moves = this.state.moves;

    // implement some function that maps moves array to components;

    return (
      <div className = "moveLog">
        <Header name = {"Moves log"}/>
      </div>
    )
  }
}

export default MoveLog;
