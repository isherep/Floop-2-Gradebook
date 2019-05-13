import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import Grades from './grades.js';
import './navTab.css';

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
        <TabPanel style={{background: "lightyellow"}}>
          <Grades/>
        </TabPanel>
        <TabPanel style={{background: "lightpink"}}>
          <Grades/>
        </TabPanel>
        <TabPanel style={{background: "orange"}}>
          <Grades/>
        </TabPanel>
        <TabPanel style={{background: "lightgreen"}}>
          <Grades/>
        </TabPanel>
        <TabPanel style={{background: "lightblue"}}>
          <Grades/>
        </TabPanel>
      </Tabs>
    )
  }
}

export default NavTab;
