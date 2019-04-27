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
      </LeftTab>
      <LeftTab>
      </LeftTab>
      <LeftTab>
      </LeftTab>
    </div>
  );
}

export default LeftTabsColumn;
