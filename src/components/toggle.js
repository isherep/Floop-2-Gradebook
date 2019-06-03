import React, {Component} from 'react';
import '../css/toggleButton.css';
import ViewByMetric from './viewByMetric';
import ViewByAssignment from './viewByAssignment';
import SumbmissionsTab from './sumbmissionsTabData';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Flexbox from 'flexbox-react';
import '../css/navTab.css';
import DrawerToggleButton from './DrawerToggleButton';
import 'react-tabs/style/react-tabs.css';

class Toggle extends Component {

    constructor(props) {
        super(props);
        //creating a refference of ViewByAssignment component in the Toggle view 
        this.assignmentView = React.createRef()
        //contrils the toggle between view by assignemtn and Metric View
        //does not control table data, table data is set in ViewByAssignment
        this.state = {
            on: true,
        }
       
     }
        /*
     onClick = () => {
        this.ViewByAssignment.switchToGrades();
      }
        */
      /**
       * Method to change the state of child view by assignment component
       */
      handleClick = () =>{
          //thows an error - cannot read property current.switchToGrades() of  null
          this.assignmentView.current.switchToGrades()
      }

     // The parent component can manage child state passing a prop to child and 
     // the child convert this prop in state using componentWillReceiveProps.
     componentWillReceiveProps(props) {
        this.setState({ open: props.drawerOpen })
      }

   toggle = () => {
       this.setState({
           on: !this.state.on
       })
   }

   
    render() {
        return (
            <div class="toggleButton">
                <Flexbox flexDirection="row" className="subtoggleButton">
                <li><b>View by Assignment</b></li>
                <li>
                <label class="switch">
                    <input onClick={this.toggle} type="checkbox"/>
                    <span class="slider round"></span>
                </label>
                </li>
                <li><b>View by Metric</b></li>
                </Flexbox>
                <div className="toggler">
                {this.state.on &&
                    <Tabs className="tabs">
                        <div className="toolbar-toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                        </div>
                        {/* toggle tabs on a left*/}
                        <TabList className="tabList">
                            {/* Submission tab*/}
                            <Tab className="subTab">Submissions</Tab>
                            {/* Grades tab - onClick changes data from submission statuses to grades*/}
                            <Tab className="gradesTab">Grades</Tab>
                            <Tab className="feedbackTab">Feedback</Tab>
                            <Tab className="readTab">%Feedback Read</Tab>
                            <Tab className="respondedTab">%Feedback Responded</Tab>
                        </TabList>
                        <TabPanel style={{background: "#ffe6ff"}} onClick={this.handleClick}>
                             <ViewByAssignment ref = {this.assignmentView} />
                             <Tab className="gradesTab" onClick={this.handleClick}>Grades</Tab>
                             
                        </TabPanel>
                        <TabPanel style={{background: "#f2e6ff"}}>
                            <ViewByAssignment/>
                        </TabPanel>
                        <TabPanel style={{background: "#e6ffe6"}}>
                            <ViewByAssignment/>
                        </TabPanel>
                        <TabPanel style={{background: "#ffffe6"}}>
                            <ViewByAssignment/>
                        </TabPanel>
                        <TabPanel style={{background: "#ffeecc"}}>
                             <ViewByAssignment/>
                        </TabPanel>
                    </Tabs>
                }

                {!this.state.on &&

                    <Tabs className="tabs">
                    <TabList className="tabList">
                        <Tab className="subTab">Assignment 1</Tab>
                        <Tab className="gradesTab">Assignment 2</Tab>
                        <Tab className="feedbackTab">Assignment 3</Tab>
                        <Tab className="readTab">Assignment 4</Tab>
                        <Tab className="respondedTab">Assignment 5</Tab>
                    </TabList>
                    <TabPanel style={{background: "#57D194"}}>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel style={{background: "#57D194"}}>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel style={{background: "#57D194"}}>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel style={{background: "#57D194"}}>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel style={{background: "#57D194"}}>
                        <ViewByMetric/>
                    </TabPanel>
                    </Tabs>
                }
                </div>
            </div>
        );
    }
}
export default Toggle;
