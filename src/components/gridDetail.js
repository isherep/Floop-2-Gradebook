import React, {Component} from 'react';
import '../css/grid.css';

class GridDetail extends Component {
    render() {
        return (
            <ul className="gradeItems">
                <li>
                    {this.props.grid.id}
                </li>
                <li>
                    {this.props.grid.name}
                </li>
                <li>
                    {this.props.grid.a1}
                </li>
                <li>
                    {this.props.grid.a2}
                </li>
                <li>
                    {this.props.grid.a3}
                </li>
                <li>
                    {this.props.grid.a4}
                </li>
                <li>
                    {this.props.grid.a5}
                </li>
                <li>
                    {this.props.grid.a6}
                </li>
            </ul>
        )
            }
}
export default GridDetail;