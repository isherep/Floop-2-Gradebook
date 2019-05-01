import React, {Component} from 'react';


class LeftTab extends Component{
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
    console.log(this.state.lefttab)
    return this.state.lefttab.map((lefttab) =>(
      <div className = 'LeftTab'>
      <h3 key = {lefttab.id}>
        {lefttab.title}
        </h3> 
      </div>
    ));    
  }
}

export default LeftTab;
