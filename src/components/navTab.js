import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import DatabaseLayout from './databaseLayout.js';
import '../css/navTab.css';

class NavTab extends Component{
  render() {
    return (
      <Tabs className="tabs">
        <TabList className="tabList">
            <Tab className="subTab">Submissions</Tab>
            <Tab className="gradesTab">Grades</Tab>
            <Tab className="feedbackTab">Feedback</Tab>
            <Tab className="readTab">%Feedback Read</Tab>
            <Tab className="respondedTab">%Feedback Responded</Tab>
        </TabList>
        <TabPanel style={{background: "#ffe6ff"}}>
          <DatabaseLayout/>
        </TabPanel>
        <TabPanel style={{background: "#f2e6ff"}}>
          <DatabaseLayout/>
        </TabPanel>
        <TabPanel style={{background: "#e6ffe6"}}>
          <DatabaseLayout/>
        </TabPanel>
        <TabPanel style={{background: "#ffffe6"}}>
          <DatabaseLayout/>
        </TabPanel>
        <TabPanel style={{background: "#ffeecc"}}>
          <DatabaseLayout/>
        </TabPanel>
      </Tabs>
    )
  }
}
export default NavTab;

