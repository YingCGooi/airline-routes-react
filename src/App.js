import React, { Component } from 'react';
import './App.css';
import TableContainer from './components/TableContainer'
import Form from './components/Form'
import Data from './data'

class App extends Component {
  defaultState = {
    airlineId: 'all',
    airportCode: 'all'
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  hasMatchAirline(airlineId, route) {
    if (airlineId === 'all') return true;
    return route.airline === +airlineId;
  }

  hasMatchAirport(airportCode, route) {
    if (airportCode === 'all') return true;
    return [route.src, route.dest].includes(airportCode);
  }

  filterRoutes = () => {
    return Data.routes.filter(route => (
      this.hasMatchAirline(this.state.airlineId, route) &&
      this.hasMatchAirport(this.state.airportCode, route)
    ));
  }

  filterAirlines = (routes) => {
    const routeAirlineIds = routes.map(route => route.airline);

    return this.assignDisableProp(Data.airlines, routeAirlineIds, 'id');
  }

  filterAirports = (routes) => {
    const routeAirportCodes = routes.reduce((prev, route) => (
      prev.concat(route.src, route.dest)
    ), [routes[0].src, routes[0].dest])

    return this.assignDisableProp(Data.airports, routeAirportCodes, 'code');
  }

  assignDisableProp = (data, routeValues, keyName) => {
    return data.map(row => {
      const hasValue = routeValues.includes(row[keyName]);
      return Object.assign(row, { disabled: !hasValue });
    });
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }

  handleSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleShowAllClicked = (e) => {
    e.preventDefault();
    this.setState(_ => this.defaultState);
    document.querySelectorAll('select').forEach(select => {
      select.value = 'all';
    });
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = this.filterRoutes();
    const filteredAirlines = this.filterAirlines(filteredRoutes);
    const filteredAirports = this.filterAirports(filteredRoutes);

    return (
      <div>
        <header className='ui inverted square menu'>
          <h3 className='header item'>Airline Routes</h3>
        </header>
        <main className='ui container'>
          <Form 
            airlineOptions={filteredAirlines} 
            airportOptions={filteredAirports}
            onSelect={this.handleSelect}
            onShowAllClicked={this.handleShowAllClicked}
          />

          <div className='ui divider' />

          <TableContainer
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={25}
          />
        </main>
        <div className='ui divider' />
      </div>
    );
  }
}

export default App;