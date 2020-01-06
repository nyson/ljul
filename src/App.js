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
      seqs: {
        pink:  [],
        red:   [],
        green: [],
        blue:  []
      }
    };
  }

  visualise(levels) {
    return "levels: " + levels
      .map(b => Math.round(b.value * 100))
      .join("|");
  }
  update(st) {
    this.setState({...st});
    this.forceUpdate();
  }

  render(){
    return (
      <div className="App">
        <Sequencer
          max={this.state.max}
          min={this.state.min}
          bars={this.state.bars}
          baseColor="#ef0ad4"
          name="Pinku"
          onUpdate={bars => {
            const st = this.state;
            st.seqs.pink = bars;
            this.update(st);
          }}
        />
        <pre>{this.visualise(this.state.seqs.pink)}</pre>

        <Sequencer
          max={this.state.max}
          min={this.state.min}
          bars={this.state.bars}
          baseColor="#ff0000"
          name="Red"
          onUpdate={bars => {
            const st = this.state;
            st.seqs.red = bars;
            this.update(st);
          }}
        />
        <pre>{this.visualise(this.state.seqs.red)}</pre>

        <Sequencer
          max={this.state.max}
          min={this.state.min}
          bars={this.state.bars}
          baseColor="#00ff00"
          name="Green"
          onUpdate={bars => {
            const st = this.state;
            st.seqs.green = bars;
            this.update(st);
          }}
        />
        <pre>{this.visualise(this.state.seqs.green)}</pre>

        <Sequencer
          max={this.state.max}
          min={this.state.min}
          bars={this.state.bars}
          baseColor="#0000ff"
          name="Blue"
          onUpdate={bars => {
            const st = this.state;
            st.seqs.blue = bars;
            this.update(st);
          }}
        />
        <pre>{this.visualise(this.state.seqs.blue)}</pre>

      </div>

      );
  }

}

export default App;
