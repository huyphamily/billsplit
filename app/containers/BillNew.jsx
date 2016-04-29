import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { addBill } from 'actions/bills';
import { push } from 'react-router-redux';

class BillNew extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    this.props.addBill(data)
      .then(() => this.props.dispatch(push('/dashboard')));
  }

  render() {
    const {
      bill: { isSubmitting },
      fields: { description, participant, amount, isPayer },
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)} >
        <h3>Create A New Bill</h3>
        <div className={`form-group ${description.touched && description.invalid ? 'has-danger' : ''}`}>
          <label>Description</label>
          <input type="text" className="form-control" {...description} />
          <div className="text-help">
            { description.touched ? description.error : '' }
          </div>
        </div>
        <div className={`form-group ${participant.touched && participant.invalid ? 'has-danger' : ''}`}>
          <label>With whom?</label>
          <input type="text" className="form-control" {...participant} />
          <div className="text-help">
            { participant.touched ? participant.error : '' }
          </div>
        </div>
        <div className={`form-group ${amount.touched && amount.invalid ? 'has-danger' : ''}`}>
          <label>Amount</label>
          <input type="number" className="form-control" {...amount} />
          <div className="text-help">
            { amount.touched ? amount.error : '' }
          </div>
        </div>
        <div className={`form-group ${isPayer.touched && isPayer.invalid ? 'has-danger' : ''}`}>
          <label>Who paid for it?</label>
          <div>
            <label className="radio-inline">
              <input type="radio" {...isPayer} value="true" checked={isPayer.value === 'true'} /> I did
            </label>
            <label className="radio-inline">
              <input type="radio" {...isPayer} value="false" checked={isPayer.value === 'false'} /> They did
            </label>
            <div className="text-help">
            { isPayer.touched ? isPayer.error : '' }
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary" disabled={isSubmitting}
          value={isSubmitting ? 'Submitting...' : 'Submit'} />
        <Link to="/dashboard" className="btn btn-danger" disabled={isSubmitting} >Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.description) {
    errors.description = 'Enter a description';
  }

  if (!values.participant) {
    errors.participant = 'Enter a participant';
  }

  if (!values.amount) {
    errors.amount = 'Please let us know the amount';
  }

  if (!values.isPayer) {
    errors.isPayer = 'Please let us know who paid!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { bill: state.bill };
}

export default reduxForm({
  form: 'BillNew',
  fields: ['description', 'participant', 'amount', 'isPayer'],
  validate
}, mapStateToProps, { addBill })(BillNew);
