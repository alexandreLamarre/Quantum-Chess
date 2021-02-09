import React from "react";
import Message from "../Message"
import "./ChatHistory.css";

class ChatHistory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      height:0,
    }
    console.log("CHAT HISTORY PID", this.props.pid)
  }

  render(){
    const messages = this.props.history.map((msg, index) =>
      <Message key = {index} message = {msg.message} pid = {msg.pid}
      color = {this.props.pid === msg.pid?false: true}/>
    );

    return(
      <div className = "ChatHistory" style = {{display:"flex", flexDirection:"column"}}>
        {messages}
      </div>
    )

  }
}

export default ChatHistory;
