import React from "react";
import {Link, Redirect} from "react-router-dom";
import {joinQueue} from "../../api";
import Loader from "../Loader";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import {schoolOutline, globeOutline, desktopOutline, logoOctocat, alertOutline, copyOutline,
arrowBackOutline} from "ionicons/icons";
import {IonContent, IonTitle, IonButton, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonIcon, IonItem, IonChip, IonLabel} from '@ionic/react';

class PublicQueue extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: "- -",
      sA : (Math.PI / 180) * 45,
      sE: (Math.PI / 180) * 90,
      pid: this.props.pid,
    }
    this.socket = this.props.socket;
    this.qid = 2;
  }

  componentDidMount(){

    if(this.state.pid && this.socket){
      joinQueue(this.socket, this.qid, this.state.pid);
      console.log("registering in public queue");
    }


  }

  componentWillUnmount(){
    if(this.state.pid && this.socket){
      joinQueue(this.socket, 0, this.state.pid);
      console.log("unregistering from public queue");
    }
  }


  render(){
    if(!this.state.pid || !this.socket){
      return(
        <Redirect to = {"/online"}/>
      )
    }
    const players_in_queue = this.props.queueSize;

    return(
      <IonContent style = {{cursor: "default"}}>
        <IonItem >
          <Link to = {"/online"} style = {{textDecoration: "none", color: "black"}}>
            <IonIcon icon = {arrowBackOutline}>
            </IonIcon>
          </Link>
          <IonTitle> Public Queue </IonTitle>
        </IonItem>
        <Loader color = "rgb(0,0,255)"/>
        <div style = {{display: "flex", justifyContent: "center", marginTop: "5%"}}>
          <IonLabel> Other Players in Queue: {players_in_queue}</IonLabel>
        </div>
      </IonContent>
    )
  }
}

export default PublicQueue;
