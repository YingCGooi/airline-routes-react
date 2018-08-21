import React, { Component } from 'react';
import Table from './Table';
import Buttons from './Buttons';

class TableContainer extends Component {
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

  componentWillReceiveProps(nextProps) {
    this.setState(_ => ({ pageNumber: 0 }) );
  }

  render() {
    const pageNumber = this.state.pageNumber;    
    const { format, perPage, rows } = this.props;

    const numberOfRoutes = Object.keys(rows).length; 
    const maxPageNumber = Math.floor(numberOfRoutes / perPage) - 1;

    const start = pageNumber * perPage;
    const end = (pageNumber + 1) * perPage;

    const headerCells = this.props.columns.map(column => (
      <th key={column.property}>{column.name}</th>
    ));

    const bodyCells = rows.map((route, i) => (
      <tr key={i}>
        <td className='three wide'>{format('airline', route.airline)}</td>
        <td className='six wide'>{format('src', route.src)}</td>
        <td>{format('dest', route.dest)}</td>
      </tr>
    )).slice(start, end);

    return (
      <section>
        <p className='medium-text'>
          {this.rangeShowMessage(start, end, numberOfRoutes)}
        </p>

        <Buttons 
          isPrevDisabled={ pageNumber === 0 }
          isNextDisabled={ pageNumber >= maxPageNumber }
          handlePrevClicked={this.handlePrevClicked}
          handleNextClicked={this.handleNextClicked}
        />

        <Table headerCells={headerCells} bodyCells={bodyCells} />
      </section>
    )
  }
}

export default TableContainer;