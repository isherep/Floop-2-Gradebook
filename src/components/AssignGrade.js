import React, {Component} from 'react';


class AssignGrade extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grades: [
                {
                    id:1,
                    grade:'40',
                    completed: false
                },
                {
                    id:2,
                    grade:'25',
                    completed: false 
                },
                {
                    id:3,
                    grade:'34',
                    completed: false 
                },
                {
                    id:4,
                    grade:'15',
                    completed: false
                },

                {
                    id:5,
                    grade:'40',
                    completed: false
                },
                {
                    id:6,
                    grade:'25',
                    completed: false 
                },
                {
                    id:7,
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
        
        return this.state.grades.map((grades) =>(
          <div className = 'Grade'>
          <h3 key = {grades.id}>
            {grades.grade}
            </h3> 
          </div>
        ));    
      }
}
    
export default AssignGrade;