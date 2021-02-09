import React from "react";
import Chat from "../Chat";
import MoveLog from "../MoveLog";
import Settings from "../Settings";
import {Redirect} from "react-router-dom";

import "./GameTabs.css";
import {IonItem, IonIcon, IonContent} from "@ionic/react";
import {chatboxOutline, optionsOutline, bookOutline, flagOutline} from "ionicons/icons";

class GameTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tab: "chat",
    }
    this.main = this.props.main;
    this.gid = this.props.match.params.gid;
  }

  componentDidMount(){
    if(!this.gid){
      alert("Malformed game id");
    }
    else{
      this.main.createGameSocket(this.gid);
    }
  }

  render(){
    if(!this.gid){
      return (
        <Redirect to = {"/"}/>
      )
    }
    return(
      <IonContent>

          <div style = {{display: "flex", justifyContent: "space-evenly", outline: "1px solid rgba(73,73,73,0.5)"}}>
          <IonItem lines = "none">
            <IonIcon slot = "end" icon = {chatboxOutline}
            style = {{cursor: "pointer", color: this.state.tab === "chat"? "green":"black"}}
            onClick = {() => this.setState({tab:"chat"})}/>
          </IonItem>
          <IonItem lines = "none" >
            <IonIcon slot = "end" icon = {bookOutline}
            style = {{cursor: "pointer", color: this.state.tab === "log"? "green": "black"}}
            onClick = {() => this.setState({tab: "log"})}/>
          </IonItem>
          <IonItem lines = "none">
            <IonIcon slot = "end" icon = {optionsOutline}
            style = {{cursor: "pointer", color: this.state.tab === "settings"? "green": "black"}}
            onClick = {() => this.setState({tab:"settings"})} />
          </IonItem>
          <IonItem lines = "none">
            <IonIcon slot = "end" icon = {flagOutline} style = {{cursor: "pointer"}} />
          </IonItem>
          </div>

          <div hidden = {this.state.tab !== "chat"}>
            <Chat pid = {this.props.pid} main = {this.main} pid = {this.main.state.id}/>
          </div>

          <div hidden = {this.state.tab !== "log"}>
            <MoveLog />
          </div>

          <div hidden = {this.state.tab !== "settings"}>
            <Settings />
          </div>

      </IonContent>
    )
  }
}

export default GameTabs;
