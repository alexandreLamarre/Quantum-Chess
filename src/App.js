import React from "react";
import './App.css';
import Game from "./components/Game/Game.jsx";
import Main from "./components/Main";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    return  (
      <div className = "App">
        <Main/>
      </div>
    );
  }
}

export default App;
