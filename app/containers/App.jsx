import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
// import Message from 'containers/Message';
import NotificationsSystem, { POSITIONS } from 'reapop';
import theme from 'reapop-theme-wybo';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/main';

// notification defaults
const defaultValues = {
  position: POSITIONS.topCenter,
  closeButton: true,
};

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({children}) => {
  return (
    <div className={classNames('app')}>
      <Navigation />
      <NotificationsSystem theme={theme} defaultValues={defaultValues} />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
