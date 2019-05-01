import React, {Component} from 'react';
import LeftTab from './LeftTab';

class LeftTabsColumn extends Component {

   
    render() {
        
        
        return (
            <div className = 'LeftTabsColumn'>
                
                <LeftTab left = {this.props.LeftTab} />
            </div>
        )
      }
}
    
export default LeftTabsColumn;
