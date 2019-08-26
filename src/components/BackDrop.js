import React from 'react';

import '../css/BackDrop.css';

const backDrop = props => (
  <div className="backdrop" onClick={props.click}/>
);

export default backDrop;
