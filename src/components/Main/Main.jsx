import React from "react";
import {v4 as uuidv4} from "uuid";
import ChessBoard from "../ChessBoard";
import MainOptions from "../MainOptions";

import "./Main.css";
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      local_id: null,
    }
  }

  componentDidMount(){
    const v = uuidv4(); // assign basically a guest uuid
    this.setState({local_id:v})
  }

  render(){
    return(
      <div className = "Main">

        <div className = "BoardArea">
          <ChessBoard />
        </div>
        <div className = "OtherArea">
          <MainOptions />
        </div>

      </div>
    )
  }
}

export default Main;
