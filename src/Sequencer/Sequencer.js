import React from 'react';
import './Sequencer.css';

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      value: this.props.max
    };
  }
  enter(e) {
    this.setState({hover: true});
  }

  leave(e) {
    this.setState({hover: false});
  }
  
  render() {
    return(
      <div
        key={this.props.id}
        className={"bar " + (this.state.hover ? "hover" : "")} 
        onMouseEnter={e => this.enter(e)}
        onMouseLeave={e => this.leave(e)}
        style={{height: this.props.value * 100 + "%"}}

        />
    );
  }
}

class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    
    const bars = Array.from(
      {length: 10}, 
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
    console.log(this.state.bars.map(b => Math.round(b.value * 100)))
  }
  
  render() {
    return (
      <div 
          className="sequencer"
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
            />
        )}

      </div>
    );
  }

  drawIfClicked(e) {
    if(this.state.isDrawing) {
      this.updateAtPosition(e);
    }
  }

  updateAtPosition(e) {
    const [x, y, height, width] = [
      e.pageX - e.currentTarget.offsetLeft, 
      e.pageY - e.currentTarget.offsetTop,
      e.currentTarget.offsetHeight,
      e.currentTarget.offsetWidth
    ];
    const percHeight = 1 - y / height;
    const barId = Math.floor(x / ( width / this.props.bars));

    const bars = this.state.bars;
    bars[barId].value = percHeight;
    this.setState({bars})

  }

  barClick(e) {
    console.log(e);
    console.log(e.clientX, e.clientY);
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    console.log(e.currentTarget);
  }




}

export default Sequencer;
