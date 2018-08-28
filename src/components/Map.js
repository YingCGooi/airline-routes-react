import React, { Component } from 'react';
import Data from '../data';

const svgURI = 'http://www.w3.org/2000/svg';

class Map extends Component {
  round(number) {
    return Math.round(number);
  }

  getAirportRoutes(routes) {
    return routes.map( ({src, dest}) => {
      const route = { src: Data.getAirportByCode(src), 
        dest: Data.getAirportByCode(dest) };

      route.src = Object.assign(route.src, {
        lat: this.round(route.src.lat), 
        long: this.round(route.src.long)
      });

      route.dest = Object.assign(route.dest, { 
        lat: this.round(route.dest.lat), 
        long: this.round(route.dest.long) 
      });      

      return route;
    });
  }

  vanillaRenderCircles(airportRoutes, outerG) {
    airportRoutes.forEach( ({src, dest}, index) => {
      const g = document.createElementNS(svgURI, 'g');

      const srcCircle = this.createCircle('source', src);
      const destCircle = this.createCircle('destination', dest);

      const title = document.createElement('title');
      title.append(src.name);
      srcCircle.append(title);
      g.append(srcCircle);
      g.append(destCircle);
      outerG.append(g);
    });
  }

  vanillaRenderPaths(airportRoutes, outerG) {
    airportRoutes.forEach(({src, dest}, index) => {
      const g = document.createElementNS(svgURI, 'g');
      const path = document.createElementNS(svgURI, 'path');
      path.setAttribute('d', `M ${src.long} ${src.lat} L ${dest.long} ${dest.lat}`);

      g.append(path);
      outerG.append(g);
    });    
  }

  vanillaRenderMap(props) {
    const oldSvg = document.querySelector('svg');
    if (oldSvg) oldSvg.remove();

    const airportRoutes = this.getAirportRoutes(props.routes);

    const svg = document.createElementNS(svgURI, 'svg');
    svg.setAttributeNS(null, 'viewBox', "-180 -90 360 180");

    const outerG = document.createElementNS(svgURI, 'g');
    outerG.setAttribute('transform', 'scale(1 -1)');

    const image = document.createElementNS(svgURI, 'image');
    const imageAttrs = {
      xlinkHref: "equirectangular_world.jpg",
      href: "equirectangular_world.jpg",
      x: "-180",
      y: "-90",
      height: "100%",
      width: "100%",
      transform: "scale(1 -1)"
    };

    for (let attr in imageAttrs) {
      image.setAttribute(attr, imageAttrs[attr]);
    }

    outerG.append(image);
    svg.append(outerG);
    document.querySelector('.map').append(svg);

    this.vanillaRenderPaths(airportRoutes, outerG);
    this.vanillaRenderCircles(airportRoutes, outerG);

    svg.addEventListener('click', (e) => {
      props.onCircleClicked(e);
    });
  }

  componentWillReceiveProps(newProps) {
    this.vanillaRenderMap(newProps);
  }

  componentDidMount() {
    this.vanillaRenderMap(this.props);
  }

  createCircle(className, airport) {
    const srcCircle = document.createElementNS(svgURI, 'circle');

    srcCircle.setAttribute('class', className);
    srcCircle.setAttribute('cx', airport.long);
    srcCircle.setAttribute('cy', airport.lat);
    srcCircle.setAttribute('data-code', airport.code);

    return srcCircle;
  }

  render() {
    // we don't render the paths and circles here using JSX, since it will take around 400ms!
    return (
      <svg viewBox="-180 -90 360 180">
      </svg>
    )
  }
}

export default Map;