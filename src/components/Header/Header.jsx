import React from "react";
import "./Header.css";

class Header extends React.Component{
  render(){
    return(
      <div className = "header">
        <h2> {this.props.name} </h2>
      </div>
    )
  }
}

export default Header;
