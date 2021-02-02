import React from "react";
import "./Game.css";
import ChessBoard from "../ChessBoard";
import GameTabs from "../GameTabs";


class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return (
      <div className = "Game">
        <div className = "gameArea">
          <ChessBoard/>
        </div>
        <div className = "infoArea">
          <GameTabs/>
        </div>
      </div>
    )
  }
}
export default Game;
