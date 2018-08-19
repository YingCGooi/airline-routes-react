import React, { Component } from 'react';
import './App.css';
import Table from './components/Table.js'

class App extends Component {
  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
            className="routes-table"
            columns={columns}
            rows=""
            format=""
          />
        </section>
      </div>
    );
  }
}

export default App;