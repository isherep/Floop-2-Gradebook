import React, {Component} from 'react';


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

                {
                    id:5,
                    name:'Bob',
                    completed: false
                },
                {
                    id:6,
                    name:'Maria',
                    completed: false 
                },
                {
                    id:7,
                    name:'Kevin',
                    completed: false 
                },
                {
                    id:8,
                    name: 'Jose',
                    completed: false
                },

                {
                    id:9,
                    name:'Bob',
                    completed: false
                },
                {
                    id:10,
                    name:'Maria',
                    completed: false 
                },
                {
                    id:11,
                    name:'Kevin',
                    completed: false 
                },
                {
                    id:12,
                    name: 'Jose',
                    completed: false
                },

                {
                    id:13,
                    name:'Bob',
                    completed: false
                },
                {
                    id:14,
                    name:'Maria',
                    completed: false 
                },
                {
                    id:15,
                    name:'Kevin',
                    completed: false 
                },
                {
                    id:16,
                    name: 'Jose',
                    completed: false
                },
            ]
        };
      }

    render() {
        
            return this.state.students.map((students) =>(
                <div className = 'Grid'>
                <h3 key = {students.id}>
                  {students.name}
                  </h3> 
                </div>
        ));
      }
}
    
export default Grid;