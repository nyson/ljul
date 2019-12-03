import React from 'react';
import Sequencer from './Sequencer/Sequencer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sequencer 
        max={1}
        min={0}
        bars={10}
      />
    </div>
  );
}

export default App;
