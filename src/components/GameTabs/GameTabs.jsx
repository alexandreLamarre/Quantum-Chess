import React from "react";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import Chat from "../Chat";
import MoveLog from "../MoveLog";


import 'react-tabs/style/react-tabs.css';
import "./GameTabs.css";

class GameTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    return(
      <div className = "gameTabs">
        <Tabs forceRenderTabPanel= {false}>
          <TabList>
            <Tab> Chat </Tab>
            <Tab> Log </Tab>
            <Tab> Settings</Tab>
          </TabList>

          <TabPanel>
            <Chat/>
          </TabPanel>
          <TabPanel>
            <MoveLog/>
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
