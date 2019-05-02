import React, {Component} from 'react';

import '../App.css';

import AssignGrade1 from './AssignGrade1'
import AssignGrade2 from './AssignGrade2';

class Assign1Column extends Component {

    render(){

    return (
    
            <div className = "GradeCol1">
                <AssignGrade1 />    
            </div>
      );
    }
    
}
    export default Assign1Column;
    