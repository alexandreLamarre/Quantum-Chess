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
    this.setState({loaded: true});
    if(data === null) return;
    const games = data.Ids;
    const player_count = data.Players;
    const parsed_data = [];
    if(games === null) return;
    if(player_count === null) return;
    for(let i = 0; i < games.length; i++){
      parsed_data.push({id:games[i], count: player_count[i]})
    }
    console.log("data from game list", parsed_data)
    this.setState({data: parsed_data})
  }



  render(){
    const content = !this.state.loaded? <Loader color = "rgb(0, 255,0)"/>: this.state.data !== []?
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
