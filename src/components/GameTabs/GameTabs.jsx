import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import Chat from "../Chat";
import MoveLog from "../MoveLog";
import {Redirect} from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import "./GameTabs.css";

class GameTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this.main = this.props.main;
    this.gid = this.props.match.params.gid;
  }

  componentDidMount(){
    if(!this.gid){
      alert("Malformed game id");
    }
    else{
      this.main.createGameSocket(this.gid);
    }


  }

  render(){
    if(!this.gid){
      return (
        <Redirect to = {"/"}/>
      )
    }
    return(
      <div className = "gameTabs">
        <Tabs>
          <TabList>
            <Tab> Chat </Tab>
            <Tab> Log </Tab>
            <Tab> Settings</Tab>
          </TabList>

          <TabPanel>
            <h2> Chat </h2>
          </TabPanel>
          <TabPanel>
            <h2> Move Log</h2>
          </TabPanel>
          <TabPanel>
            <h2> Nothing here atm! </h2>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default GameTabs;
