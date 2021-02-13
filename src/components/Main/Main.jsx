import React from "react";
import {v4 as uuidv4} from "uuid";
import ChessBoard from "../ChessBoard";
import MainOptions from "../MainOptions";
import Online from "../Online";
import GameRooms from "../GameRooms";
import AIOutline from "../AIOutline";
import Scenarios from "../Scenarios";
import RankedQueue from "../RankedQueue";
import PublicQueue from "../PublicQueue";
import CreateGame from "../CreateGame";
import GameTabs from "../GameTabs";
import User from "../User";
import {BACKEND_URL} from "../../api";

import {connect, connectGame} from "../../api";
import {BrowserRouter as Router, Route} from "react-router-dom";

import { logoElectron, checkboxOutline,
  closeCircleOutline, logoOctocat, alertOutline, copyOutline, personCircleOutline } from 'ionicons/icons';
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

const WHITE = 0;
const BLACK = 1;

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      id: null,
      player:WHITE,
      games_played: "- - ",
      players_online: "- - ",
      server_status: false,
      ranked_queue: "- -",
      public_queue: "- - ",
      gameSocket: null,
      playing: null,
      other_player_name: null,
      other_player_icon: null,
      chatHistory: [],
      highlight: true,
      highlight_check:true,
      mark: true,
      drawArrow: true,

    }
    this.chess = React.createRef();
  }

  componentDidMount(){

    const v = uuidv4(); // assign a guest uuid
    console.log("Client id", v);
    var socket = new WebSocket(BACKEND_URL + "/ws/" + v);
    this.setState({socket: socket, id:v});
    connect(socket, (rsp) => {this.handleServerResponse(rsp)}, (v) => this.setServerStatus(v))
    //this.createGameSocket(v);
  }

  /**
  @param id the user id trying to connect to game
  **/
  createGameSocket(gid){
    console.log("Game id", gid);
    var gameSocket = new WebSocket(BACKEND_URL + "/game/" + gid+ "/"+ this.state.id);
    this.setState({gameSocket: gameSocket});
    connectGame(gameSocket, (rsp) => {this.handleGameResponse(rsp)});
  }

  handleServerResponse(rsp){
    const data = JSON.parse(rsp.data);
    console.log(data)
    if(parseInt(data.Type) === 0){ // TYPE == 0 updates player count
      this.setState({players_online: data.players})
    }
    else if(parseInt(data.Type) === 1){ // TYPE == 1 updates queue lengths;

    }
    else if(parseInt(data.Type) === 2){ //TYPE == 2  has matched two players and will connect them
      const id = ""
      // this.createGameSocket(id);
    }
  }

  handleGameResponse(rsp){
    const data = JSON.parse(rsp.data);
    console.log("parsed game data", data);
    if(parseInt(data.type) === 0){ //player connected and match starts
        console.log("Opponent connected", data.pid)
        this.setState({playing: true,
          other_player_name: "Guest - " + data.pid, other_player_icon: personCircleOutline})
        this.chess.current.ResetBoard();
        this.chess.current.setState({interacteable: true,
                                    player:parseInt(data.color),
                                    flipped: parseInt(data.color) === BLACK})


      } else if(parseInt(data.type) === 1){ //board update
          console.log(data)
      //1. update board
      //parseBoardData

      //this.chess.current.updateBoard(BoardData)
      //2. update move log
      //send string representation of move to move log

    } else if (parseInt(data.type) === 2){ // chat update
      //send string update to chat
      const pid = data.pid;
      const content = data.message;
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, {pid: data.pid, message:content}]
      }));
    }
    else if (parseInt(data.type) === 3){ //player leave

    }
    else if(parseInt(data.type) === 4){ // spectator/join

    }
  }

  setServerStatus(online){
    console.log("Server status set.");
    this.setState({server_status: online});
    if(!online){
      this.setState({ players_online: "- - ", games_played: "- -"})
    }
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
                  <IonLabel> {this.state.games_played.toString() + " Total Games played"} </IonLabel>
                  <IonLabel> {this.state.players_online + " Players online"}</IonLabel>
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

            {/*Opponent */}
            <div hidden = {this.state.playing === null}>
            <User  name = {this.state.other_player_name}
            icon = {this.state.other_player_icon} />
            </div>

            </IonCol>
            <IonCol>

            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
            {/*ACTIVE = TRUE only for testing, otherwise undefined, or better yet, false. */}
              <ChessBoard ref = {this.chess}
              main = {this} player = {this.state.player}
              fullBoard = {true}/>
            </IonCol>
            <IonCol>
              <Route path = "/" exact component = {MainOptions} />

              <Route path = "/online" exact component = {Online}/>

              <Route path = "/online/gamerooms" exact component = {GameRooms}/>

              <Route path = "/online/customgame/" exact
              render = {() => <CreateGame local_id = {this.state.id} />} />


              <Route path = "/online/public" exact
                  render = {() => <PublicQueue socket = {this.state.socket}
                  pid = {this.state.id} queueSize = {this.state.public_queue}/>}/>
              <Route path = "/online/public/{id}" exact />
              <Route path = "/online/ranked" exact
                  render = {() => <RankedQueue socket = {this.state.socket}
                  pid = {this.state.id} queueSize = {this.state.ranked_queue}/> }/>
              <Route path = "/ai" exact component = {AIOutline} />
              <Route path = "/scenario" exact component = {Scenarios}/>


              <Route path = "/game/:gid" render = {(routeProps)=>
                (<GameTabs {...routeProps} main = {this} />)}
               />
            </IonCol>


          </IonRow>
          <IonRow>
            <IonCol size = "6">


            {/* <User></User>   where your username will go*/}
            <User
            name = {this.state.auth? "John Doe": "Guest -"+this.state.id}
            icon = {personCircleOutline}>
            </User>


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
