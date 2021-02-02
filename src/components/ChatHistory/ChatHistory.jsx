import React from "react";
import Message from "../Message"
import "./ChatHistory.css";

class ChatHistory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      height:0,
    }
  }

  componentDidMount(){
    this.setState({height:window.innerHeight*0.65})
    window.addEventListener("resize", ()=> this.onResize())
  }

  onResize(){
    this.setState({height:window.innerHeight*0.65})
  }
  render(){
    const messages = this.props.history.map((msg, index) =>
      <Message message = {msg.data}/>
    );

    return(
      <div className = "ChatHistory" style = {{maxHeight: this.state.height}}>
        {messages}
      </div>
    )

  }
}

export default ChatHistory;
