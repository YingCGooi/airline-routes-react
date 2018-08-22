import React from 'react';

const Buttons = (props) => (
  <div>
    <button
      className='ui left button'
      id='prev'
      key='prev'
      disabled={props.isPrevDisabled}
      onClick={props.handlePrevClicked}
    >
      <i className='left arrow icon' />Previous Page
    </button>
    <button
      className='ui right button'
      id='next'
      key='next'
      disabled={props.isNextDisabled}
      onClick={props.handleNextClicked}
    >
      Next Page<i className='right arrow icon' />
    </button>
  </div>
)

export default Buttons;