import React, {Component} from 'react';
import nav from '../mock-data/navTab.json';
import NavTabDetail from './navTabDetail';

class NavTab extends Component{
  render() {
    return (
      <div>
          {nav.map((navItem, index)=>{
              return <NavTabDetail nav={navItem}/>
          })}
      </div>
  )
  }
}

export default NavTab;
