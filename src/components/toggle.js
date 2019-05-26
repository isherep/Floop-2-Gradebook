import React, {Component} from 'react';
import '../css/toggleButton.css';

class Toggle extends Component {

    state = {

    }

    render() {
        return (
            <div class="toggleButton">
                <ul>
                <li><b>View by Assignment</b></li>
                <li>
                <label class="switch">
                    <input type="checkbox"/>
                    <span class="slider round"></span>
                </label>
                </li>
                <li><b>View by Metric</b></li>
                </ul>
            </div>
        );
    }

}
export default Toggle;