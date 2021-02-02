import React from "react";
import "./Chat.css";
import Header from "../Header";
import ChatHistory from "../ChatHistory";
import ChatInput from "../ChatInput";
import {connect, sendMsg} from "../../api";

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      chatHistory: []
    }
  }

  componentDidMount(){
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }));
      console.log(this.state);
    })
  }

  send(event){
    if(event.keyCode === 13){
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render(){
    return  (
      <div>
        <Header name = {"Messages"}/>
        <ChatHistory history={this.state.chatHistory} />
        <ChatInput send = {this.send}/>
      </div>
    );
  }
}

export default Chat;
