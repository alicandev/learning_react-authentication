import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <Component {...props} />
  )} />
)

PrivateRoute.propTypes = {
  component: PropTypes.component
}

export default PrivateRoute
