import React from 'react';
import './App.css';
import LeftTabsColumn from './components/LeftTabsColumn';
import Grid from './components/grid';

function App() {
  return (
    <div className="App">
      <h1>Gradebook</h1>
      <LeftTabsColumn /> 
      <Grid/>
      </div>
  );
}

export default App;
