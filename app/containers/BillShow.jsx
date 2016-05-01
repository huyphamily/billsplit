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
        <tr className={value.creditor == undefined? "green" : "red"} key={value.id}>
          <td>{value.description}</td>
          <td>{value.amount}</td>
          <td>{value.creditor == undefined ? value.debtor.email : value.creditor.email}</td>
          <td>
            <input
              className="btn btn-danger"
              type="button"
              onClick={() => this.props.removeBillRequest(value.id, index, title)}
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
    let bills = []; 
    let debtsPointer = 0;
    let creditsPointer = 0;
    console.log(this.props.bill);
    let length = this.props.bill.debts.length + this.props.bill.credits.length;
    while (length > 0){
      if(this.props.bill.credits[creditsPointer] == undefined){
        bills.push(this.props.bill.debts[debtsPointer]);
        debtsPointer ++;
      }
      else if(this.props.bill.debts[debtsPointer] == undefined){
        bills.push(this.props.bill.credits[creditsPointer]);
        creditsPointer ++;
      }
      else if(this.props.bill.debts[debtsPointer].createdAt > this.props.bill.credits[creditsPointer].createdAt){
        bills.push(this.props.bill.debts[debtsPointer]);
        debtsPointer  ++;
      }else{
        bills.push(this.props.bill.credits[creditsPointer]);
        creditsPointer ++;
      }
      length --;
    }


    return <div>
             { bills.length ? this.renderTable('Bills', bills) : '' }
             { bills.length === 0 && bills.length === 0 ?
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
