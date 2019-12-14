import React from 'react';
import Sequencer from './Sequencer/Sequencer.js';
import NumberInput from './NumberInput.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      max: 1,
      bars: 32,
      seqVal: ""
    };
  }

  update(st) {
    console.log("updating...", st);
    this.setState({...st})
    this.forceUpdate();
    console.log(this.state);
  }

  render(){ 
    return (
      <div className="App">
        <Sequencer 
          max={this.state.max}
          min={this.state.min}
          bars={this.state.bars}
          onUpdate={seqVal => this.update({ seqVal })}
        />

        <NumberInput
          name="bars"
          humanName="Bars"
          value={32}
          onUpdate={bars => this.update({bars})}
          />

        <pre>
          {this.state.seqVal}
        </pre>
          
      </div>
      
      );
  }

}

export default App;
