import React, {Component} from 'react';
import LeftTab from './LeftTab';
import '../App.css';

class LeftTabsColumn extends Component {

    
    state = {
        
        lefttab: [
            {
                id:1,
                title:'Submissions',
                completed: false
            },
            
            {
                id:2,
                title:'Grade',
                completed: false 
            },
            
            {
                id:3,
                title:'Number of FeedBack Received',
                completed: false 
            },
            
            {
                id:4,
                title: '% of FeedBack Read',
                completed: false
            },
            {
                id:5,
                title: '% of Feedback responded to',
                completed: false 
            },
        ]
        
    }
        
    
  
    render() {  
        console.log()
        return (
            <div>
            <LeftTab />
              <p>{}</p>
            </div>
            
          )  
    }
}
    
export default LeftTabsColumn;
