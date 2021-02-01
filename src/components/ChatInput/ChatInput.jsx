import React from "react"
import "./ChatInput.css"

class ChatInput extends React.Component{

  render(){
    return(
      <div className = "ChatInput">
        <input onKeyDown = {this.props.send} />
      </div>
    );
  }
}

export default ChatInput;
