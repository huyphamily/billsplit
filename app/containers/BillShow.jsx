import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills, removeBillRequest } from 'actions/bills';

class BillShow extends Component {

  static need = [  // eslint-disable-line
    fetchBills
  ]

  renderTable() {
    const { allBills } = this.props.bill;
    const row = allBills.map((value, index) => {
      const isCreditor = value.creditor === undefined;
      return (
        <tr
          key={value.id}
          className={isCreditor ? 'table-success' : 'table-danger'} >
          <td>{value.description}</td>
          <td>{value.amount}</td>
          <td>{isCreditor ? value.debtor.email : value.creditor.email}</td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              onClick={() => this.props.removeBillRequest(value.id, index)}
              value="Marked Paid"
            />
          </td>
        </tr>
      )
    });

    return (
      <div>
        <h3>Bills</h3>
        <table className="table">
          <thead className="thead-inverse">
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
    const { allBills } = this.props.bill;

    return <div>
             { allBills.length ? this.renderTable() : '' }
             { allBills.length === 0 ?
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
