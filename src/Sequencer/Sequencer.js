import React from 'react';
import './Sequencer.css';
import { Bar } from './Bar';
import Prando from 'prando';



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
      colors: this.genColorScheme(
        this.props.baseColor,
        new Prando(this.props.name))
    };

    console.debug(this.state.colors);
  }

  hex2RGB(col) {
    return this.i2RGB(parseInt(col, 16));
  }

  i2RGB(x) {
    const hex2 = Math.pow(16, 2);
    return {
      red: Math.floor(x / Math.pow(16, 4)),
      green: Math.floor(x / hex2) % hex2,
      blue: x % hex2
    };
  }

  RGB2hex(rgb) {
    return [rgb.red, rgb.green, rgb.blue]
      .map(x => Math.floor(x).toString(16))
      .join("");
  }

  hexAdd(hex1, hex2) {
    return {
      red: hex1.red + hex2.red,
      blue: hex1.blue + hex2.blue,
      green: hex1.green + hex2.green
    };
  }
 
  genColorScheme(col, rng) {
    const hexBase = this.hex2RGB(col);
    for(const i in hexBase) hexBase[i] /= 2;
    const cols = {
      header: this.hexAdd(hexBase, this.hex2RGB("111111")),
      bg: this.hexAdd(hexBase, this.rngCol(rng)),
      bar: this.hexAdd(hexBase, this.rngCol(rng)),
      barSelected: this.hexAdd(hexBase, this.rngCol(rng))
    };
    for(const i in cols) cols[i] = this.RGB2hex(cols[i]);
    return cols;
  }

  rngCol(rng) {
    const g = () => rng.next(0, Math.pow(16, 2) / 2);
    const r = {
      red: g(),
      blue: g(),
      green: g()
    };
    return r;
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
          style={{backgroundColor: '#' + this.state.colors.header}}
        >{this.props.name}</h3>
        <div
          className="sequencer"
          style={{backgroundColor: '#' + this.state.colors.bg}}
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
                highlight={'#' + this.state.colors.barSelected}
                color={'#' + this.state.colors.bar}
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
