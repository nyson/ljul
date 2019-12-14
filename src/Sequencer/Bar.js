import React from 'react';

export class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      value: this.props.max
    };
  }
  enter(e) {
    this.setState({ hover: true });
  }
  leave(e) {
    this.setState({ hover: false });
  }
  render() {
    return (
      <div key={this.props.id} 
        className={"bar " + (this.state.hover ? "hover" : "")} 
        onMouseEnter={e => this.enter(e)} 
        onMouseLeave={e => this.leave(e)} 
        style={{ height: this.props.value * 100 + "%" }} />);
  }
}
