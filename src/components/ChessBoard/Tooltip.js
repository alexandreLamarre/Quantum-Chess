import React from "react";

import {IonItem} from "@ionic/react";

class Tooltip extends React.Component{
    render(){
        return(
            <IonItem>
                {this.props.data.model+" " +this.props.data.state + " : " + this.props.data.probability + "%"}
            </IonItem>
        )
    }
}

export default Tooltip;