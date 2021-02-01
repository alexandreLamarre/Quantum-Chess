import React from "react";
import Message from "../Message"
import "./ChatHistory.css";

class ChatHistory extends React.Component{

  render(){
    const messages = this.props.history.map((msg, index) =>
      <Message message = {msg.data}/>
    );

    return(
      <div className = "ChatHistory">
        <h2> Chat history </h2>
        {messages}
      </div>
    )

  }
}

export default ChatHistory;
