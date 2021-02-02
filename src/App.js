import React from "react";
import './App.css';
import Game from "./components/Game/Game.jsx";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    return  (
      <div className = "App">
        <Game/>
      </div>
    );
  }
}

export default App;
