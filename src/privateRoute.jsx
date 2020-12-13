import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => (
        // Normally, we'd have to ensure that the authTokens is valid.
        // Here, it's not done for the sake of simplicity.
        authTokens ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
