import React from "react";
import {Link, Redirect} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {createGame} from "../../api"
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

import {arrowBackOutline} from "ionicons/icons";
import {IonContent, IonItem, IonIcon, IonTitle, IonButton, IonInput, IonLabel,
 IonList, IonRadioGroup, IonListHeader, IonRadio} from "@ionic/react";

class CreateGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gid:null,
      privacy: "false"
    }
    this.id = this.props.local_id;
  }

  componentDidMount(){
    const gid = uuidv4();
    this.setState({gid: gid})
  }

  debug(e){
    console.log(e)
  }

  submitGameRules(e){
    console.log("privacy", this.state.privacy)
    console.log('gid', this.state.gid)
    createGame(() => alert("created game"), this.state.gid, this.state.privacy);
  }

  render(){
    if(this.id === undefined || this.id === null){
      return (
        <Redirect to = {"/online"}/>
      )
    }
    return (
      <IonContent style = {{cursor: "default"}}>
        <IonItem >

          <Link to = {"/online"} style = {{textDecoration: "none", color: "black"}}>
            <IonIcon icon = {arrowBackOutline}>
            </IonIcon>
          </Link>

          <IonTitle >
            Create Custom Game
          </IonTitle>

        </IonItem>
        <br></br>
        <IonItem>
          <IonLabel position = "stacked">
            Game ID
          </IonLabel>
          <IonInput value = {this.state.gid} maxlength = "36" onInput = {(e) => this.setState({gid:e.target.value})} >

          </IonInput>
        </IonItem>
        <br></br>

        <IonList>
          <IonRadioGroup value = {this.state.privacy} onIonChange= {(e) => this.setState({privacy:e.detail.value})}>
            <IonListHeader>

                Privacy

            </IonListHeader>

            <IonItem>
              <IonLabel>
                Public
              </IonLabel>
              <IonRadio value = "false" />
            </IonItem>

            <IonItem>
              <IonLabel>
                Private
              </IonLabel>
              <IonRadio  value = "true" />
            </IonItem>

          </IonRadioGroup>
        </IonList>

        <div style = {{display: "flex", justifyContent: "center"}}>
          <IonButton onClick = {(e) => this.submitGameRules(e)}> Create </IonButton>
        </div>

      </IonContent>
    )
  }
}

export default CreateGame;
