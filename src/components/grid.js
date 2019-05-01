import React, {Component} from 'react';
import '../App.css';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [
                {
                    id:1,
                    name:'Bob',
                    completed: false
                },
                {
                    id:2,
                    name:'Maria',
                    completed: false 
                },
                {
                    id:3,
                    name:'Kevin',
                    completed: false 
                },
                {
                    id:4,
                    name: 'Jose',
                    completed: false
                },
            ]
        };
      }

    render() {
        return (
            <div className = 'Grid'>
                {this.state.students[0].name}
            </div>
        )
      }
}
    
export default Grid;