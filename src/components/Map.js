import React, { Component } from 'react';
import Data from '../data';
import Circle from './Circle';

class Map extends Component {
  generateKey = (src, dest) => (
    src + dest + String(Math.random())
  )

  render() {
    const airportRoutes = this.props.routes.map( ({src, dest}) => (
      { src: Data.getAirportByCode(src), 
        dest: Data.getAirportByCode(dest) }
    ));

    const paths = airportRoutes.map(({src, dest}) => (
      <g key={this.generateKey(src.code, dest.code)}>
        <path d={`M${src.long} ${src.lat} L ${dest.long} ${dest.lat}`} />
      </g>
    ));

    const circles = airportRoutes.map(({src, dest}) => (
      <g key={this.generateKey(src.code, dest.code)}>
        <Circle 
          className="source" 
          airport={src}
          onClick={this.props.onCircleClicked}
          onMouseEnter={this.props.onCircleMouseIn}
        />

        <Circle 
          className="destination" 
          airport={dest}
          onClick={this.props.onCircleClicked}
          onMouseEnter={this.props.onCircleMouseIn}
        />
      </g>      
    ));

    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        {paths}
        {circles}
        </g>
        }
      </svg>
    )
  }
}

export default Map;