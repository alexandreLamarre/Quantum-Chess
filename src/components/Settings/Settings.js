import React from "react";
import Header from "../Header";
import "./Settings.css";

import {IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption} from "@ionic/react";

class Settings extends React.Component{
  constructor(props){
    super(props);

    this.main = this.props.main;
  }


  componentDidMount(){
    // TODO: fetch settings from database if authenticated

    //this.setState()
  }

  componentDidUpdate(){
    //when state changes call methods in Main to apply the settings
  }

  render(){
    return (
        <div className = "settings">
        <Header name = "Keybind Settings"/>
        <IonItem>
          <IonLabel>
            Move Piece
          </IonLabel>
          <IonSelect>
            <IonSelectOption>
              Left click
            </IonSelectOption>
            <IonSelectOption>
              Right click
            </IonSelectOption>
            <IonSelectOption>
              Middle click
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <Header name = "Overlay Settings"/>
        <IonItem>
          <IonToggle checked = {true} />
          <IonLabel> Highlight legal moves </IonLabel>
          <IonSelect>
            <IonSelectOption>
            Left click move
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonToggle checked = {true} />
          <IonLabel> Highlight pieces in check </IonLabel>
        </IonItem>
        <IonItem>
          <IonToggle checked = {true}/>
          <IonLabel> Mark squares </IonLabel>
          <IonSelect>
            <IonSelectOption>
              Middle Click
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonToggle checked = {true}/>
          <IonLabel> Draw arrows </IonLabel>
          <IonSelect>
            <IonSelectOption>
              Right click & move
            </IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>
    )
  }
}

export default Settings;
