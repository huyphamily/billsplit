import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import 'css/components/login';
import hourGlassSvg from 'images/hourglass.svg';

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const { user: { isLogin }, dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      dispatch(manualLogin({
        email,
        password
      }));
    } else {
      dispatch(signUp({
        email,
        password
      }));
    }
  }

  toggleMode() {
    this.props.dispatch(toggleLoginMode());
  }

  renderHeader() {
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div className={classNames('header')}>
          <h1 className={classNames('heading')}>Login with Email</h1>
          <div className={classNames('alternative')}>
            Not what you want?
            <a className={classNames('alternative-link')}
              onClick={this.toggleMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={classNames('header')}>
      <h1 className={classNames('heading')}>Register with Email</h1>
        <div className={classNames('alternative')}>
          Already have an account?
          <a className={classNames('alternative-link')}
            onClick={this.toggleMode}> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div className={classNames('login-or-register', {
        waiting: isWaiting
      })}>
        <div className={classNames('login-container')}>
          { this.renderHeader() }
          <img className={classNames('loading')} src={hourGlassSvg} />
          <div className={classNames('col-xs-12')}>
            <form
              className={classNames('text-xs-center')}
              onSubmit={this.handleOnSubmit} >
              <fieldset className={classNames('form-group')}>
                <input
                  className={classNames('form-control')}
                  type="email"
                  ref="email"
                  placeholder="email" />
              </fieldset>
              <fieldset className={classNames('form-group')}>
                <input
                  className={classNames('form-control')}
                  type="password"
                  ref="password"
                  placeholder="password" />
              </fieldset>
              <input className={classNames('btn btn-primary btn-block')} type="submit"
                value={isLogin ? 'Login' : 'Register'} />
              <div
                className={
                  classNames('alert alert-info message', {
                    invisible: !message || message.length === 0
                  })
                } >
                {message}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(LoginOrRegister);
