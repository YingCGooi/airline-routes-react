import React from 'react';

const Table = (props) => (
  <table className='ui celled striped compact table'>
    <thead>
      <tr>{props.headerCells}</tr>
    </thead>     
    <tbody>
      {props.bodyCells}
    </tbody>
  </table>
)

export default Table;