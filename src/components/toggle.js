import React, {Component} from 'react';
import '../css/toggleButton.css';
import NavTab from './navTab';

class Toggle extends Component {

   state = {
       on: true
   }

   toggle = () => {
       this.setState({
           on: !this.state.on
       })
   }

    render() {
        return (
            <div class="toggleButton">
                <ul>
                <li><b>View by Assignment</b></li>
                <li>
                <label class="switch">
                    <input onClick={this.toggle} type="checkbox"/>
                    <span class="slider round"></span>
                </label>
                </li>
                <li><b>View by Metric</b></li>
                </ul>
                <div className="toggler">
                {this.state.on && 
                    <NavTab/>
                }
                </div>
            </div>
        );
    }
}
export default Toggle;