import React from 'react';

class NumberInput extends React.Component {
  render() {
    return (<>    
      <br/>    
      <label htmlFor={this.props.name}>
        {this.props.humanName || "Value"}: 
      </label>
      <input 
        name={this.props.name}
        type="number" 
        onChange={e => {this.props.onUpdate(parseInt(e.target.value))}}
      /></>);
  }
}

export default NumberInput;