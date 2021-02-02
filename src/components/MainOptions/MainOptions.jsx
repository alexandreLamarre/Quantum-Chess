import React from "react";
import "./MainOptions.css";

import OptionsHeader from "../OptionsHeader";
import BigButton from "../BigButton";

class MainOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
      <div className = "mainOptions">
        <OptionsHeader description = "Learn & Play Quantum Chess" />
        <BigButton title = "Play Online"
        subtitle = "Choose from Ranked, Public or Custom Private Matches"
        imgURL = "url(../../../src/models/placeholderOnline.png)"
        color = "rgb(34,139,34)"/>
        <BigButton
        title = " Play Versus AI"
        subtitle = "Choose from a variety of custom built algorithms to play against"
        imgURL = "url(./src/models/placeholderAI.png)"
        color = "rgb(109, 109, 100)" />

        <BigButton title = "Learn Quantum Chess"
          subtitle = "Read about the rules of quantum chess and some basic strategies here"
        />
      </div>
    )
  }
}

export default MainOptions;
