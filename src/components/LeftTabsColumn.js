import React, {Component} from 'react';
import LeftTab from './LeftTab';
import '../App.css';

class LeftTabsColumn extends Component {

   
    render() {
        
        
        return (
            <div className = 'LeftTabsColumn'>
                <h3>Tabs</h3>
                <LeftTab left = {this.props.LeftTab} />
            </div>
        )
      }
}
    
export default LeftTabsColumn;
