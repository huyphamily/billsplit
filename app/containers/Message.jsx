import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import 'css/components/message';


const Message = ({message, type}) => {
  return (
    <div className={classNames('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS'
    })}>{message}</div>
  );
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps)(Message);
