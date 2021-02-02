import React from "react";
import "./OptionsHeader.css";

class OptionsHeader extends React.Component{

  render(){
    return(
      <div>
        <h1 className = "bigheader"> {this.props.description} </h1>
      </div>
    )
  }
}

export default OptionsHeader;
