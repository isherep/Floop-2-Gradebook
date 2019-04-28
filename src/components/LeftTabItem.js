import React, {Component} from 'react';


export class LeftTabItem extends Component{
  render() {
    return (
      <div>
        <p>{this.props.lefttab.title }</p>
      </div>
      
    )  
  }
}

export default LeftTabItem;
