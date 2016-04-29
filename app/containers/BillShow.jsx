import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills } from 'actions/bills';

class BillShow extends Component {

  static need = [  // eslint-disable-line
    fetchBills
  ]

  renderCreditTable() {
    const creditView = this.props.bill.Credits.map((value) => {
      return (
        <tr key={value.id}>
          <td>{value.description}</td>
          <td>{value.amount}</td>
        </tr>);
    });

    return (
      <div>
        <h3>Credits</h3>
        <table className="table table-inverse">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {creditView}
          </tbody>
        </table>
      </div>)
  }

  renderDebtTable() {
    const debtView = this.props.bill.Debts.map((value) => {
      return (
        <tr key={value.id}>
          <td>{value.description}</td>
          <td>{value.amount}</td>
        </tr>);
    });

    return (
      <div>
        <h3>Debts</h3>
        <table className="table table-inverse">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {debtView}
          </tbody>
        </table>
      </div>)
  }

  renderBills() {
    const { Credits, Debts } = this.props.bill;

    return <div>
             { Credits.length ? this.renderCreditTable() : '' }
             { Debts.length ? this.renderDebtTable() : '' }
             { Credits.length === 0 && Debts.length === 0 ?
               'You currently have no bills. Go ahead and add one!' : '' }
           </div>;
  }

  renderLoading() {
    return <p className="text-xs-center">Loading...</p>
  }

  render() {
    return (
      <div>
        {this.props.bill.isFetching ? this.renderLoading() : this.renderBills()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { bill: state.bill };
}

export default connect(mapStateToProps)(BillShow);
