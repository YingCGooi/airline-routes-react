import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'

class App extends Component {
  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div>
        <header className='ui inverted square menu'>
          <h3 className='header item'>Airline Routes</h3>
        </header>
        <main className='ui container'>
          <Table
            columns={columns}
            perPage={25}
          />
        </main>
        <div className='ui divider' />
      </div>
    );
  }
}

export default App;