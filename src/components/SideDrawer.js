import React from 'react';

import '../css/SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if(props.show){
    drawerClasses = 'side-drawer open';
  }
  return (
  <nav className={drawerClasses}>
    <ul>
      <li><a href="/">Submissions</a></li>
      <li><a href="/">Grades</a></li>
      <li><a href="/">Feedback</a></li>
      <li><a href="/">%Feedback Read</a></li>
      <li><a href="/">%Feedback Responded</a></li>
    </ul>
  </nav>
  );
};

export default sideDrawer;
