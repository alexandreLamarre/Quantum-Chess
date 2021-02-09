import React from "react";
import {Link} from "react-router-dom"
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
import { IonItem, IonLabel, IonCard} from "@ionic/react";

 class GameInfo extends React.Component{

   render(){
     console.log(this.props.data);
     return (
       <Link to = {"/game/" + this.props.data.id} style = {{textDecoration: "None"}}>
       <IonItem>
          <IonLabel> {"Game-" + this.props.data.id} </IonLabel>
          <IonLabel> {"Players: " + this.props.data.count + "/2"}</IonLabel>
       </IonItem>
       </Link>
     )
   }
 }

 export default GameInfo;
