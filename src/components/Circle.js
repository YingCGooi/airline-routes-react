import React from 'react';

const Circle = (props) => (
  <circle
    className={props.className} 
    cx={props.airport.long}
    cy={props.airport.lat}
    data-code={props.airport.code}
    onClick={props.onClick}   
  >
    <title>{props.airport.name}</title>
  </circle>
)

export default Circle;