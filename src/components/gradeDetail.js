import React, {Component} from 'react';
import '../css/grid.css';

class GradeDetail extends Component {
    render() {
        return (
            <ul className="gradeItems">
                <li>
                    {this.props.grade.id}
                </li>
                <li>
                    {this.props.grade.name}
                </li>
                <li>
                    {this.props.grade.a1}
                </li>
                <li>
                    {this.props.grade.a2}
                </li>
                <li>
                    {this.props.grade.a3}
                </li>
                <li>
                    {this.props.grade.a4}
                </li>
                <li>
                    {this.props.grade.a5}
                </li>
                <li>
                    {this.props.grade.a6}
                </li>
            </ul>
        )
            }
}
export default GradeDetail;