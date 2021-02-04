import React from "react";
import {v4 as uuidv4} from "uuid";
import ChessBoard from "../ChessBoard";
import MainOptions from "../MainOptions";


import { logoElectron, checkboxOutline,
  closeCircleOutline } from 'ionicons/icons';
import { IonGrid, IonRow, IonCol, IonContent, IonLabel, IonIcon,
IonCard, IonItem} from '@ionic/react';
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
      authenticated: false,
      local_id: null,
      games_played: 0,
      players_online: 0,
      server_status: true,

    }
  }

  componentDidMount(){
    const v = uuidv4(); // assign basically a guest uuid
    this.setState({local_id:v})
  }

  render(){
    return(
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
                    <IonIcon slot = "end" icon = {this.state.server_status? checkboxOutline: closeCircleOutline}/>
                    <IonLabel> Server status</IonLabel>
                  </IonItem>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <ChessBoard />
            </IonCol>
            <IonCol>
              <MainOptions />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

    )
  }
}

export default Main;
