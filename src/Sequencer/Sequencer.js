import React from 'react';
import './Sequencer.css';
import Bar from './Bar';
import Prando from 'prando';
import {RGB, genScheme} from '../Colors.js';


class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    const bars = Array.from(
      {length: this.props.bars},
      (e) => ({ value: 1 })
    );

    this.state = {
      bars,
      isDrawing: false,
      colors: {
        header: RGB.fromHex(this.props.baseColor)
          .map(x => x / 2)
          .add(RGB.fromHex('#ffffff').map(x => x/2))
          .toHex(),
        ...genScheme(
          this.props.baseColor,
          ["bg", "bar", "barSelected"],
          new Prando(this.props.name))
      }
    };
  }

  startDrawing(e) {
    this.setState({isDrawing: true});
  }

  stopDrawing(e) {
    this.setState({isDrawing: false});
    this.props.onUpdate(this.state.bars);
  }

  render() {
    return (
      <>
        <h3
          style={{backgroundColor: this.state.colors.header}}
        >{this.props.name}</h3>
        <div
          className="sequencer"
          style={{backgroundColor: this.state.colors.bg}}
          onClick={e => {
            this.updateAtPosition(e);
            this.stopDrawing(e);
          }}
          onMouseLeave={e => this.setState({isDrawing: false})}
          onMouseEnter={e => this.setState({isDrawing: false})}
          onMouseMove={e => this.drawIfClicked(e)}
          onMouseDown={e => this.startDrawing(e)}
          onMouseUp={e => this.stopDrawing(e)}
        >
          {this.state.bars.map(
            (b, i) =>
              <Bar
                highlight={this.state.colors.barSelected}
                color={this.state.colors.bar}
                key={i}
                id={i}
                max={this.props.max}
                min={this.props.min}
                value={b.value}
              />)}

        </div>
      </>
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
