import React, { Component } from 'react';
import Data from '../data';
import Table from './Table';
import Buttons from './Buttons';

class Dashboard extends Component {
  state = {
    pageNumber: 0,
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
    
  render() {
    const format = this.props.format;
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
        <td className='three wide'>{format('airline', route.airline)}</td>
        <td className='six wide'>{format('src', route.src)}</td>``
        <td>{format('dest', route.dest)}</td>
      </tr>
    )).slice(start, end);

    return (
      <section>               
        <Table headerCells={headerCells} bodyCells={bodyCells} />

        <p className='medium-text'>
          {this.rangeShowMessage(start, end, numberOfRoutes)}
        </p>        

        <Buttons 
          isPrevDisabled={ pageNumber === 0 }
          isNextDisabled={ pageNumber >= maxPageNumber }
          handlePrevClicked={this.handlePrevClicked}
          handleNextClicked={this.handleNextClicked}
        />  
      </section>
    )
  }
}

export default Dashboard;