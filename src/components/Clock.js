import React from 'react'
import ReactPropTypes from 'prop-types'

function Clock({ className = '', minutes = 20, seconds = 48 }) {
  return (
    <h2 className={'Clock ' + className}>
      Pozostało {minutes}:{seconds}
    </h2>
  )
}
Clock.defaultProps = {
  className: '',
}
function NonNegativeNumberType(props, propName, componentName) {
  if (props[propName] < 0) {
    return new Error(
      `Invalid prop '${propName}' issued to component '${componentName}.
       It has to be greater or equal 0'`,
    )
  }
}
const NumberOrStringType = ReactPropTypes.oneOfType([
  ReactPropTypes.number,
  ReactPropTypes.string,
])
Clock.propTypes = {
  className: ReactPropTypes.string.isRequired,
  minutes: NumberOrStringType.isRequired,
  seconds: NonNegativeNumberType,
}

export default Clock
