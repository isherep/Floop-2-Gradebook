import React from 'react';
import './App.css';
import LeftTabsColumn from './components/LeftTabsColumn';
import Grid from './components/grid';
import AssignGrade1 from './components/AssignGrade1';
import AssignGrade2 from './components/AssignGrade2';
import GradesHolder from './components/GradesHolder';


function App() {
  return (
    <div className="App">
      <h1>Gradebook</h1>
      
      <LeftTabsColumn /> 
      <div className = "NamesCol">
      <Grid/>
      </div>
      <GradesHolder />
      
      </div>
  );
}

export default App;
