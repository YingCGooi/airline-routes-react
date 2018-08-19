import React, { Component } from 'react';
import './App.css';
import Data from './data.js';

class App extends Component {
  getAirline(route) {
    const airline = Data.getAirlineById(route.airline);
    return airline.name;
  }

  getAirport(code) {
    const airport = Data.getAirportByCode(code);
    return airport.name;
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>          
            <tbody>
            {
              Data.routes.map((route, i) => (
                <tr key={i}>
                  <td>{this.getAirline(route)}</td>
                  <td>{this.getAirport(route.src)}</td>
                  <td>{this.getAirport(route.dest)}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;