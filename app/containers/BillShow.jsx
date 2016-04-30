import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills, removeBillRequest } from 'actions/bills';

class BillShow extends Component {

  static need = [  // eslint-disable-line
    fetchBills
  ]

  renderTable(title, data, user) {
    const credit = title === 'Credits';
    const row = data.map((value, index) => {
      return (
        <tr key={value.id}>
          <td>{value.description}</td>
          <td>{value.amount}</td>
          <td>{value[user].email}</td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              onClick={() => this.props.removeBillRequest(value.id, index, credit)}
              value="Marked Paid"
            />
          </td>
        </tr>
      )
    });

    return (
      <div>
        <h3>{title}</h3>
        <table className="table table-inverse">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
      </div>
    );
  }

  renderBills() {
    const { credits, debts } = this.props.bill;

    return <div>
             { credits.length ? this.renderTable('Credits', credits, 'debtor') : '' }
             { debts.length ? this.renderTable('Debts', debts, 'creditor') : '' }
             { credits.length === 0 && debts.length === 0 ?
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

export default connect(mapStateToProps, { removeBillRequest })(BillShow);
