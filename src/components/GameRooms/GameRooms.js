import React from "react";
import {Link} from "react-router-dom";
import Loader from "../Loader";
import GameInfo from "../GameInfo";
import {fetchGameRooms} from "../../api"
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
      loaded: false,
      data: [],
    }
  }

  componentDidMount(){
    fetchGameRooms((data) => this.onFetchGameRooms(data));
  }

  onFetchGameRooms(data){
    console.log("data from game list", data)
    this.setState({data: data, loaded:true})
  }



  render(){
    const content = !this.state.loaded? <Loader color = "rgb(0, 255,0)"/>: this.state.data !== null?
      this.state.data.map((data, index) => <GameInfo key = {index} data = {data}/ >):
      <div style = {{display: "flex", justifyContent: "center"}}><IonLabel style = {{marginTop: "5%"}}> No Public Games Available </IonLabel> </div>
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
        {content}
      </IonContent>
    )
  }
}

export default GameRooms;
