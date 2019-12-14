import React from 'react';

export class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      value: this.props.max,
      color: this.props.color
    };
  }
  enter(e) {
    this.setState({ color: this.props.highlight });
  }
  leave(e) {
    this.setState({ color: this.props.color });
  }
  render() {
    return (
      <div
        key={this.props.id}
        className="bar"
        style={{backgroundColor: this.state.color,
                height: this.props.value * 100 + "%"
               }}
        onMouseEnter={e => this.enter(e)}
        onMouseLeave={e => this.leave(e)}
      />);
  }
}
