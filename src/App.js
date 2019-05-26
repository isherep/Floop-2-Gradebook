import React, {Component} from 'react';
import './App.css';
import ReactTable from 'react-table'
import NavTab from './components/navTab';
import * as firebase from 'firebase';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { students, getStudentsAsynchronously, getStudentsAsynchronouslyWithPromise} from './Data/database';
import SideDrawer from './components/SideDrawer';
import BackDrop from './components/BackDrop';
import Toggle from './components/toggle';

class App extends Component {

      state = {
        sideDrawerOpen: false
      };

      drawerToggleClickHandler = () => {
        this.setState((prevState) => {
          return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
      };

      backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
      };

      render() {
        let backdrop;

        if(this.state.sideDrawerOpen){
          backdrop = <BackDrop click={this.backdropClickHandler}/>

        }
        
        //this goes under <Toggle/>
        //<NavTab drawerClickHandler={this.drawerToggleClickHandler}/>
        return(
          <div className="App">
            <h1>Gradebook</h1>
            <Toggle/>
            <SideDrawer show={this.state.sideDrawerOpen}/>
            {backdrop}
          </div>
        );
      }
    }
export default App;
