import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills } from 'actions/bills';

class BillShow extends Component {

  static need = [  // eslint-disable-line
    fetchBills
  ]

  renderBills() {
    return <span>cool</span>;
  }

  render() {
    return (
      <div>
        {this.props.bill.isFetching ? 'loading...' : this.renderBills()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { bill: state.bill };
}

export default connect(mapStateToProps)(BillShow);
