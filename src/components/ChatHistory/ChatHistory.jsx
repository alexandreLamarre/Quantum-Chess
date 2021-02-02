import React from "react";
import Message from "../Message"
import "./ChatHistory.css";

class ChatHistory extends React.Component{

  render(){
    const messages = this.props.history.map((msg, index) =>
      <Message message = {msg.data}/>
    );

    return(
      <div className = "ChatHistory" style = {{maxHeight: window.innerHeight*0.65}}>
        {messages}
      </div>
    )

  }
}

export default ChatHistory;
