import React from 'react';

const Select = (props) => (
  <div className='field'>
    <label htmlFor={props.name}>
      {props.label}
    </label>
    <select name={props.name} onChange={props.onChange}>
      <option value='all'>{props.allTitle}</option>
      {
        props.options.map(option => (
          <option 
            disabled={option.disabled} 
            value={option[props.valueKey]} 
            key={option[props.valueKey]}
          >
            { option[props.titleKey] }
          </option>
        ))
      }
    </select>
  </div>
)

export default Select;