import React from "react";
import "./Message.css";

import {IonChip, IonIcon, IonLabel} from "@ionic/react";
import {personCircleOutline} from "ionicons/icons";

class Message extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <IonChip outline = "true" style = {{pointerEvents: "none"}}
      color = {this.props.color? "tertiary":""}> <IonIcon icon = {personCircleOutline}/>
    <IonLabel> {this.props.pid + "  :  " + this.props.message} </IonLabel>
    </IonChip>
  )
  }
}

export default Message;
