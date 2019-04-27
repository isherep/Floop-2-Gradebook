import React from 'react';
import LeftTab from './LeftTab';
import '../App.css';


function LeftTabsColumn() {
  return (
    <div 
      style={{
           //display:'block',
      width:'100px',
      height:'300px',
      float:'left'
        
     
            
      }}>
       <LeftTab>
        <h3>Submissions</h3>
      </LeftTab>
      <LeftTab>
        <h1>Grade</h1>
      </LeftTab>
      <LeftTab>
        <h3>Number of FeedBack Received</h3>
      </LeftTab>
      <LeftTab>
        <h3>% of FeedBack Read</h3>
      </LeftTab>
      <LeftTab>
        <h3>% of Feedback responded to</h3>
      </LeftTab>
    </div>
  );
}

export default LeftTabsColumn;
