import React, {Component} from 'react';

import '../App.css';

import AssignGrade1 from './AssignGrade1'
import AssignGrade2 from './AssignGrade2';
import Assign1Column from './Assign1Column';
import Assign2Column from './Assign2Column'
class AssignGrade extends Component {

    render(){

    return (
        <div className = "GradesHolder">
            <div className = "GradeCol1">
                <Assign1Column />
                
            </div>

            <div className = "GradeCol2">
                <Assign2Column />
                
            </div>
            
          </div>
      );
    }
    
}
    export default AssignGrade;
    