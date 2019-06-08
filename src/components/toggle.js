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
import sumbmissionsTabData from './sumbmissionsTabData';

class Toggle extends Component {

    constructor(props) {
        super(props);
        //creating a reference of ViewByAssignment component in the Toggle view
        this.assignmentView = React.createRef()
        //contrils the toggle between view by assignemtn and Metric View
        //does not control table data, table data is set in ViewByAssignment
        this.state = {
            on: true,
        }

     }
    /* Does not change anything
     componentDidUpdate = (prevProps, prevState) => {
        // let width = ReactDOM.findDOMNode(this).parentNode.offsetWidth
        //if (prevState && prevState.width !== width) {
         //this.setState({ width })
       //}

         let studentGradesArray = this.assignmentView.componentDidMount.studentGradesArray
         if (prevState && prevState.students !== studentGradesArray) {
            this.assignmentView.this.setState({
             students: studentGradesArray
           })
         }
       }
    */

      /**
       * Method to change the state of child view by assignment component
       */
      handleClickGrades = () =>{

          this.assignmentView.current.switchToGrades()
      }

/**
       * Method to change the state of child view by assignment component to submissions
       */
      handleClickSubmissions = () =>{
        //thows an error - cannot read property current.switchToGrades() of  null
        this.assignmentView.current.switchToStatuses()
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
                <Flexbox flexDirection="row" className="subtoggleButton" style={{color: 'white'}}>
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
                            <Tab className="tab" onClick = {this.handleClickSubmissions}>Submissions</Tab>
                            <Tab className="tab" onClick = {this.handleClickGrades}>Grades</Tab>
                            <Tab className="tab">Feedback</Tab>
                            <Tab className="tab">%Feedback Read</Tab>
                            <Tab className="tab">%Feedback Responded</Tab>
                        </TabList>
                        <TabPanel>
                             <ViewByAssignment ref = {this.assignmentView} />
                        </TabPanel>
                        <TabPanel>
                            <ViewByAssignment ref = {this.assignmentView} />
                        </TabPanel>
                        <TabPanel>
                            <ViewByAssignment ref = {this.assignmentView} />
                        </TabPanel>
                        <TabPanel>
                            <ViewByAssignment  ref = {this.assignmentView} />
                        </TabPanel>
                        <TabPanel>
                             <ViewByAssignment ref = {this.assignmentView} />
                        </TabPanel>
                    </Tabs>
                }

                {!this.state.on &&
                    <Tabs className="tabs">
                    <TabList className="tabList">
                        <Tab className="tab">Assignment 1</Tab>
                        <Tab className="tab">Assignment 2</Tab>
                        <Tab className="tab">Assignment 3</Tab>
                        <Tab className="tab">Assignment 4</Tab>
                        <Tab className="tab">Assignment 5</Tab>
                        <Tab className="tab">Assignment 6</Tab>
                    </TabList>
                    <TabPanel>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel>
                        <ViewByMetric/>
                    </TabPanel>
                    <TabPanel>
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
