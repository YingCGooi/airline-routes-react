import React from 'react';
import Select from './Select'

const Form = (props) => (
  <form className='ui form'>
    <div className='equal width fields'>
      <Select
        name='airlineId'
        label='Show routes on'
        options={props.airlineOptions}
        allTitle='All Airlines'
        onChange={props.onSelect}
        valueKey='id'
        titleKey='name'
      />

      <Select
        name='airportCode'
        label='Flying in or out of'
        options={props.airportOptions}
        allTitle="All Airports"    
        onChange={props.onSelect}
        valueKey='code'
        titleKey='name'
      />
    </div>

    <div className='field'>
      <button className='ui button'>Show All Routes</button>
    </div>    
  </form>
)

export default Form;