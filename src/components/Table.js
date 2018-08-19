import React, { Component } from 'react';
import Data from '../data';

class Table extends Component {
  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }
    
  render() {
    const headerCells = this.props.columns.map(column => (
      <th key={column.property}>{column.name}</th>
    ));

    const bodyCells = Data.routes.map((route, i) => (
      <tr key={i}>
        <td>{this.formatValue('airline', route.airline)}</td>
        <td>{this.formatValue('src', route.src)}</td>
        <td>{this.formatValue('dest', route.dest)}</td>
      </tr>
    ))

    return (
      <table>
        <thead>
          <tr>{ headerCells }</tr>
        </thead>     
        <tbody>
          { bodyCells }
        </tbody>
      </table>
    )
  }
}

export default Table;