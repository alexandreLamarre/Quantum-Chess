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
    this.main = this.props.main;
    this.socket = this.props.socket;
    this.pid = this.props.pid;
  }

  componentDidMount(){
    console.log("chat socket:",  this.main.state.gameSocket)
  }

  send(event){
    if(event.keyCode === 13){
      if(this.main.state.gameSocket === undefined){
        alert("gameSocket expired --- unable to send message");
        return;
      }

      sendMsg(this.main.state.gameSocket, {pid: this.main.state.id, message: event.target.value, type: 2});
      event.target.value = "";
    }
  }

  render(){
    return  (
      <div>
        <Header name = {"Messages"}/>
        <ChatHistory pid = {this.main.state.id} history={this.main.state.chatHistory} />
        <ChatInput send = {(e) => this.send(e)}/>
      </div>
    );
  }
}

export default Chat;
