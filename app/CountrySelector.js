import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector(props) {
  const options = useMemo(() => countryList().getData(), [])
  

  const changeHandler = selectedOption => {
    props.onChange(selectedOption)
  }

  return <Select options={options} onChange={changeHandler} />
}

export default CountrySelector