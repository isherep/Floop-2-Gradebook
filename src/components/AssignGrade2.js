import React, {Component} from 'react';
import '../App.css';

class AssignGrade2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grades2: [
                {
                    id: 35,
                    grade:'40',
                    completed: false
                },
                {
                    id:36,
                    grade:'25',
                    completed: false 
                },
                {
                    id:37,
                    grade:'34',
                    completed: false 
                },
                {
                    id:38,
                    grade:'15',
                    completed: false
                },

                {
                    id:39,
                    grade:'40',
                    completed: false
                },
                {
                    id:40,
                    grade:'25',
                    completed: false 
                },
                {
                    id:41,
                    grade:'34',
                    completed: false 
                },
                {
                    id:8,
                    grade:'15',
                    completed: false
                },

                {
                    id:9,
                    grade:'40',
                    completed: false
                },
                {
                    id:10,
                    grade:'25',
                    completed: false 
                },
                {
                    id:11,
                    grade:'34',
                    completed: false 
                },
                {
                    id:12,
                    grade:'15',
                    completed: false
                },

                {
                    id:13,
                    grade:'40',
                    completed: false
                },
                {
                    id:14,
                    grade:'25',
                    completed: false 
                },
                {
                    id:15,
                    grade:'34',
                    completed: false 
                },
                
            ]
        };
      }

      render() {
        
        return this.state.grades2.map((grades2) =>(
          <div className = "Grade2">
          <h3 key = {grades2.id}>
            {grades2.grade}
            </h3> 
          </div>
        ));    
      }
}
    
export default AssignGrade2;