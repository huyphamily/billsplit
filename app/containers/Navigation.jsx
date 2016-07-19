import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames';
import 'css/components/navigation';

const Navigation = ({user, dispatch}) => {
  const logout = () => dispatch(logOut());

    return (
      <nav
        className={classNames('navigation navbar navbar-full navbar-dark bg-inverse')}
        role="navigation" >
        <Link to="/" className={classNames('navbar-brand logo')} >
          <i className={classNames('fa fa-pied-piper')} />
          Bill Split
        </Link>
        <ul className={classNames('nav navbar-nav pull-xs-right')} >
          <li className={classNames('nav-item')} >
            <Link className={classNames('nav-link')} to="/dashboard">Dashboard</Link>
          </li>
          <li className={classNames('nav-item')} >
            <Link to="/about" className={classNames('nav-link')}>About</Link>
          </li>
          <li className={classNames('nav-item')} >
            { user.authenticated ? (
              <Link onClick={logout} className={classNames('btn btn-primary')} to="/" >
              Logout
              </Link>
            ) : (
              <Link className={classNames('btn btn-primary')} to="/login" >Log in</Link>
            )}
          </li>
        </ul>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
