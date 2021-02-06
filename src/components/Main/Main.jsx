import React from "react";
import {v4 as uuidv4} from "uuid";
import ChessBoard from "../ChessBoard";
import MainOptions from "../MainOptions";
import Online from "../Online";
import GameRooms from "../GameRooms";
import AIOutline from "../AIOutline";
import Scenarios from "../Scenarios";

import {connect} from "../../api";
import {BrowserRouter as Router, Route} from "react-router-dom";

import { logoElectron, checkboxOutline,
  closeCircleOutline, logoOctocat, alertOutline, copyOutline } from 'ionicons/icons';
import { IonGrid, IonRow, IonCol, IonContent, IonLabel, IonIcon,
IonCard, IonItem, IonChip} from '@ionic/react';
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


class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      local_id: null,
      games_played: 0,
      players_online: 0,
      server_status: false,

    }
  }

  componentDidMount(){
    const v = uuidv4(); // assign basically a guest uuid
    this.setState({local_id:v})
    connect((n) => {this.setNumPlayers(n)}, (v) => this.setServerStatus(v) )
  }

  setNumPlayers(n){
    // console.log(n)
    // console.log(n.data)
    const data = JSON.parse(n.data);
    // console.log(data)
    if(data.type === 0){
      this.setState({players_online: parseInt(data.body)})
    }
  }

  setServerStatus(online){
    console.log("Server status set.");
    this.setState({server_status: online});
  }

  doNothing(){
    return;
  }

  render(){
    return(
      <Router>
      <IonContent>
        <IonGrid>
          <IonRow size = "1">
            <IonCol size = "12">
              <IonCard>
                <IonItem>
                  <IonIcon icon = {logoElectron} slot = "start"/>
                  <IonLabel> Quantum Chess</IonLabel>
                  <IonLabel> {this.state.games_played.toString() + " Games played"} </IonLabel>
                  <IonLabel> {this.state.players_online.toString() + " Players online"}</IonLabel>
                  <IonItem>
                    <IonIcon slot = "end"
                    icon = {this.state.server_status? checkboxOutline: closeCircleOutline}
                    style = {{backgroundColor:this.state.server_status?"rgba(0,255,0.7)": "rgba(255,0,0,0.5)"}}/>
                    <IonLabel> Server status</IonLabel>
                  </IonItem>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow size = "1">
            <IonCol size = "6">
              {/* <User></User> --> Eventually where enemy username will go*/}
            </IonCol>
            <IonCol>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            {/*ACTIVE = TRUE only for testing, otherwise undefined, or better yet, false. */}
              <ChessBoard fullBoard = {true} active = {true} highlight = {true}/>
            </IonCol>
            <IonCol>
              <Route path = "/" exact component = {MainOptions} />
              <Route path = "/online" exact component = {Online}/>
              <Route path = "/online/gamerooms" exact component = {GameRooms}/>
              <Route path = "/online/customgame/" exact />
              <Route path = "/online/customgame/{id}" exact />
              <Route path = "/online/public" exact />
              <Route path = "/online/public/{id}" exact />
              <Route path = "/online/ranked" exact />
              <Route path = "/online/ranked/{id}" exact />
              <Route path = "/ai" exact component = {AIOutline} />
              <Route path = "/ai/{id}" exact />
              <Route path = "/scenario" exact component = {Scenarios}/>
              <Route path = "/scenario/{id}" exact />

            </IonCol>

          </IonRow>
          <IonRow>
            <IonCol size = "6">
              {/* <User></User>   where your username will go*/}
            </IonCol>
            <IonCol style = {{display:"flex", justifyContent: "space-evenly"}}>
              <IonChip>
                <IonIcon icon = {logoOctocat}></IonIcon>
                <IonLabel> Source Code </IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon = {alertOutline}></IonIcon>
                <IonLabel> Report An Issue </IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon = {copyOutline}> </IonIcon>
                <IonLabel> Quantum Chess Rules</IonLabel>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      </Router>

    )
  }
}

export default Main;
