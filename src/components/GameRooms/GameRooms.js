import React from "react";
import {Link} from "react-router-dom";
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

class GameRooms extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
      <IonContent style = {{cursor: "default"}}>
        <IonItem >
          <Link to = {"/"} style = {{textDecoration: "none", color: "black"}}>
            <IonIcon icon = {arrowBackOutline}>
            </IonIcon>
          </Link>
          <Link to = {"/online"} style = {{textDecoration: "none"}}>
          <IonTitle >
            Matchmaking
          </IonTitle>
          </Link>

          <IonTitle style = {{
          position: "absolute", right: "0"}}>
            GameRooms
          </IonTitle>
        </IonItem>
      </IonContent>
    )
  }
}

export default GameRooms;
