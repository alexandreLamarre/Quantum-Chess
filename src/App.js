import React from "react";
import './App.css';
import Header from "./components/Header";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import {connect, sendMsg} from "./api";


class App extends React.Component {

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
      <div className = "App">
        <Header />
        <ChatHistory history={this.state.chatHistory} />
        <ChatInput send = {this.send}/>
      </div>
    );
  }
}

export default App;
