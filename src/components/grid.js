import React, {Component} from 'react';
import students from '../mock-data/students.json';
import GridDetail from './gridDetail';

class Grid extends Component {
    render() {
        return (
            <div>
                {students.map((studentItem, index)=>{
                    return <GridDetail grid={studentItem}/>
                })}
            </div>
        )
            }
}
export default Grid;