import React from "react";
import "./BigButton.css";

class BigButton extends React.Component{

  render(){
    console.log(this.props.imgURL)
    return(
      <div className = "BigButton" style = {{backgroundColor: this.props.color}}>
        <div className = "icon" style = {{backgroundImage:this.props.imgURL}}>
        </div>
        <div className = "infoBox">
          <h2> {this.props.title}</h2>
          <h4> {this.props.subtitle}</h4>
        </div>
      </div>
    )
  }
}

export default BigButton;
