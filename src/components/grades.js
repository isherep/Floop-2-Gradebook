import React, {Component} from 'react';
import grades from '../mock-data/grades.json';
import GradeDetail from './gradeDetail';

class Grades extends Component {

    render() {
        return (
            <div>
                {grades.map((gradeItem, index)=>{
                    return <GradeDetail grade={gradeItem}/>
                })}
            </div>
        )
    }
}
export default Grades;