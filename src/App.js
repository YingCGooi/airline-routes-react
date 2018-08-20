import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import Form from './components/Form'
import Data from './data'

class App extends Component {
  state = {
    airlineId: 'all',
    airportCode: 'all'
  }

  filterRoutes = () => {
    return Data.routes.filter(route => {
      const airlineId = this.state.airlineId;
      const airportCode = this.state.airportCode;
      let airlineCriteria = true;
      let airportCriteria = true;

      if (airlineId !== 'all') airlineCriteria = route.airline === +(this.state.airlineId);
      if (airportCode !== 'all') airportCriteria = [route.src, route.dest].includes(this.state.airportCode);

      return airlineCriteria && airportCriteria;
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
    this.setState(_ => ({ [name]: value }));
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutes = this.filterRoutes();
    const filteredAirlines = Data.airlines;
    const filteredAirports = Data.airports;

    return (
      <div>
        <header className='ui inverted square menu'>
          <h3 className='header item'>Airline Routes</h3>
        </header>
        <main className='ui container'>
          <Form 
            airlineOptions={filteredAirlines} 
            airportOptions={filteredAirports}
            value=""
            onSelect={this.handleSelect} 
          />

          <div className='ui divider' />

          <Dashboard
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