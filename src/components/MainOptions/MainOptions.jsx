import React from "react";
import "./MainOptions.css";
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
import {schoolOutline, globeOutline, desktopOutline, logoOctocat, alertOutline, copyOutline} from "ionicons/icons";
import {IonContent, IonTitle, IonButton, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonIcon, IonItem, IonChip, IonLabel} from '@ionic/react';


class MainOptions extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){

    return(
      <IonContent style = {{cursor: "default"}}>
      <IonItem>
        <IonTitle>
          Learn & Play Quantum Chess
        </IonTitle>
      </IonItem>
        <Link to = {"/online"} style = {{textDecoration: 'none'}}>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {globeOutline}/>
              <IonCardHeader>

                <IonCardTitle>Play Online</IonCardTitle>
                <IonCardSubtitle> Play in ranked, unranked or custom games </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
        </Link>

        <Link to= {"/ai"} style = {{textDecoration: "None"}}>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {desktopOutline}/>
              <IonCardHeader>

                <IonCardTitle>Play AI</IonCardTitle>
                <IonCardSubtitle> Play against AI of your choice </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
        </Link>

        <Link to={"/scenario"} style = {{textDecoration: "none"}}>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {schoolOutline}/>
              <IonCardHeader>

                <IonCardTitle> Learn Quantum Chess </IonCardTitle>
                <IonCardSubtitle> Play through some custom scenarios to learn the game</IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
        </IonCard>
        </Link>

      </IonContent>
    )
  }
}

export default MainOptions;
