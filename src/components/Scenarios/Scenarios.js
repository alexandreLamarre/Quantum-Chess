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
import {arrowBackOutline, schoolOutline, globeOutline, desktopOutline, logoOctocat, alertOutline, copyOutline} from "ionicons/icons";
import {IonContent, IonTitle, IonButton, IonCard, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonCardContent, IonIcon, IonItem, IonChip, IonLabel} from '@ionic/react';

class Scenarios extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    //fetch() => all the scenarios
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
            Scenarios
          </IonTitle>

        </IonItem>
      </IonContent>
    )
  }
}

export default Scenarios;
