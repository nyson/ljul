import React from 'react';
import './Sequencer.css';
import { Bar } from './Bar';

class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    const bars = Array.from(
      {length: this.props.bars}, 
      (e) => ({ value: 1 })
    );

    this.state = {
      bars,
      isDrawing: false
    }
  }

  startDrawing(e) {
    this.setState({isDrawing: true});
  }

  stopDrawing(e) {
    this.setState({isDrawing: false})
    this.props.onUpdate(this.state.bars
      .map(b => Math.round(b.value * 100))
      .join(" | ")
      )
  }
  
  render() {
    return (
      <div 
          className="sequencer"
          onClick={e => {
            this.updateAtPosition(e)
            this.stopDrawing(e)
          }}
          onMouseLeave={e => this.setState({isDrawing: false})}
          onMouseEnter={e => this.setState({isDrawing: false})}
          onMouseMove={e => this.drawIfClicked(e)}
          onMouseDown={e => this.startDrawing(e)}
          onMouseUp={e => this.stopDrawing(e)}
          >
        {this.state.bars.map((b, i) => 
          <Bar 
            key={i} 
            id={i} 
            max={this.props.max}
            min={this.props.min}
            value={b.value}
            />)}

      </div>
    );
  }

  barId = (xpos, width) => Math.floor(xpos / (width / this.props.bars));

  drawIfClicked(e) {
    if(this.state.isDrawing) {
      this.updateAtPosition(e);
    }
  }


  updateAtPosition(e) {
    const [x, y, h, w] = [
      e.pageX - e.currentTarget.offsetLeft, 
      e.pageY - e.currentTarget.offsetTop,
      e.currentTarget.offsetHeight,
      e.currentTarget.offsetWidth
    ];

    this.updateBar(
      this.barId(x,w),
      bar => bar.value = 1-y/h
      );
  }

  updateBar(id, updater) {
    const bars = this.state.bars;
    updater(bars[id]);
    this.setState({bars});
  }
}

export default Sequencer;
