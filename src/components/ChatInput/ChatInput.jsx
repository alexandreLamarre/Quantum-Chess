import React from "react"
import "./ChatInput.css"

class ChatInput extends React.Component{

  render(){
    return(
      <div className = "ChatInput">
        <input onKeyDown = {(e) =>this.props.send(e)} />
      </div>
    );
  }
}

export default ChatInput;
