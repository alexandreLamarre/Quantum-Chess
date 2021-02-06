import React from "react";
import "./Online.css";
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
import {arrowBackOutline, schoolOutline, globeOutline, desktopOutline, logoOctocat, alertOutline, copyOutline} from "ionicons/icons";
import {IonContent, IonTitle, IonButton, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonIcon, IonItem, IonChip, IonLabel} from '@ionic/react';

class Online extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    // fetch the game rooms currently 
  }

  render(){

    return(
      <IonContent style = {{cursor: "default"}}>
        <IonItem >

          <Link to = {"/"} style = {{textDecoration: "none", color: "black"}}>
            <IonIcon icon = {arrowBackOutline}>
            </IonIcon>
          </Link>

          <IonTitle >
            Matchmaking
          </IonTitle>

          <Link to = {"/online/gamerooms"} style = {{textDecoration: "none",
          position: "absolute", right: "0"}}>
          <IonTitle>
            GameRooms
          </IonTitle>
          </Link>
        </IonItem>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {globeOutline}/>
              <IonCardHeader>

                <IonCardTitle>Play Ranked</IonCardTitle>
                <IonCardSubtitle> Competitive match against an opponent of similar rank </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>

            {/*
            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
            */}
        </IonCard>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {desktopOutline}/>
              <IonCardHeader>

                <IonCardTitle>Play Unranked</IonCardTitle>
                <IonCardSubtitle> Casual match against a random opponent </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            {/*
            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
            */}
        </IonCard>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {schoolOutline}/>
              <IonCardHeader>

                <IonCardTitle> Create Custom Game </IonCardTitle>
                <IonCardSubtitle> Create a new Quantum Chess game with custom rules </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            {/*
            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
            */}
        </IonCard>
        <IonCard style = {{cursor: "pointer"}}>
            <IonItem>
              <IonIcon slot = "start" icon = {schoolOutline}/>
              <IonCardHeader>

                <IonCardTitle> Join Custom game </IonCardTitle>
                <IonCardSubtitle> Enter a game ID to join a custom game </IonCardSubtitle>
              </IonCardHeader>
            </IonItem>


            {/*
            <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
            */}
        </IonCard>
      </IonContent>
    )
  }
}

export default Online;
