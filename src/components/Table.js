import React, { Component } from 'react';
import Data from '../data';

class Table extends Component {
  state = {
    pageNumber: 0,
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }

  rangeShowMessage(start, end, numberOfRoutes) {
    return `Showing ${start + 1}-${end} of ${numberOfRoutes} routes`;
  }

  handlePrevClicked = () => {
    this.setState(prevState => (
      { pageNumber: prevState.pageNumber - 1 }
    ));
  }

  handleNextClicked = () => {
    this.setState(prevState => (
      { pageNumber: prevState.pageNumber + 1 }
    ));
  }

  componentDidMount() {
    // this.forceUpdate();
  }
    
  render() {
    const pageNumber = this.state.pageNumber;
    const perPage = this.props.perPage;
    const start = pageNumber * perPage;
    const end = (pageNumber + 1) * perPage;
    const numberOfRoutes = Object.keys(Data.routes).length; 
    const maxPageNumber = Math.floor(numberOfRoutes / perPage) - 1;

    const headerCells = this.props.columns.map(column => (
      <th key={column.property}>{column.name}</th>
    ));

    const bodyCells = Data.routes.map((route, i) => (
      <tr key={i}>
        <td className='three wide'>{this.formatValue('airline', route.airline)}</td>
        <td className='six wide'>{this.formatValue('src', route.src)}</td>
        <td>{this.formatValue('dest', route.dest)}</td>
      </tr>
    )).slice(start, end);

    return (
      <section>               
        <table className='ui celled striped compact table'>
          <thead>
            <tr>{headerCells}</tr>
          </thead>     
          <tbody>
            {bodyCells}
          </tbody>
        </table>

        <p className='medium-text'>
          {this.rangeShowMessage(start, end, numberOfRoutes)}
        </p>        

        <div>
          <button
            className='ui left button'
            key='prev'
            disabled={ pageNumber === 0 }
            onClick={this.handlePrevClicked}
          >
            <i className='left arrow icon' />Previous Page
          </button>
          <button
            className='ui right button'
            key='next'
            disabled={ pageNumber >= maxPageNumber }
            onClick={this.handleNextClicked}
          >
            Next Page<i className='right arrow icon' />
          </button>
        </div>    
      </section>
    )
  }
}

export default Table;