import React, { useState } from 'react';

export default function(props) {
  const [color, setColor] = useState(props.color);

  return(
    <div
      key={props.id}
      className="bar"
      style={{
        backgroundColor: color,
        height: props.value * 100 + "%"
      }}
      onMouseEnter={e => setColor(props.highlight)}
      onMouseLeave={e => setColor(props.color)}
    />
  );
};