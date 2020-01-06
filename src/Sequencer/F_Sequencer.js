import React, { useState } from 'react';
import './Sequencer.css';
import Bar from './Bar';


const guard = (cond, ex) => cond ? ex() : undefined;

function Sequencer(props) {
  const [isDrawing, setDrawState] = useState(false);
  const [bars, setBars] = useState(Array.from(
    {length: props.bars}, 
    (_e) => ({value: props.max})
    ));
  const barId = (xpos, width) => Math.floor(xpos / (width / props.bars));

  const updateAtPosition = (e) => {
    const [x, y, h, w] = [
      e.pageX - e.currentTarget.offsetLeft, 
      e.pageY - e.currentTarget.offsetTop,
      e.currentTarget.offsetHeight,
      e.currentTarget.offsetWidth
    ];
  
    bars[barId(x,w)] = 1-y/h;
    setBars(bars);
  }

  console.log(isDrawing);
  return (
    <div 
        className="sequencer"
        onClick={e => {
          updateAtPosition(e);
          setDrawState(false);
        }}
        onMouseLeave= {_ => setDrawState(false)}
        // onMouseEnter= {_ => setDrawState(false)}
        onMouseMove=  {e => guard(isDrawing, () => updateAtPosition(e)) }
        onMouseDown=  {_ => setDrawState(true)}
        onMouseUp=    {_ => setDrawState(false)}
        >
      {bars.map((b, i) => 
       
        <Bar 
          key={i} 
          id={i} 
          max={props.max}
          min={props.min}
          value={b.value}
          />)}

    </div>
  );}

  export default Sequencer;