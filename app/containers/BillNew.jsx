import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { addBill } from 'actions/bills';
import { push } from 'react-router-redux';
import Validator from 'validatorjs';

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
          { description.touched && description.error &&
            <div className="text-help">{description.error[0]}</div>
          }
        </div>
        <div className={`form-group ${participant.touched && participant.invalid ? 'has-danger' : ''}`}>
          <label>With whom?</label>
          <input type="email" className="form-control" {...participant} placeholder="email" />
          { participant.touched && participant.error &&
            <div className="text-help">{participant.error[0]}</div>
          }
        </div>
        <div className={`form-group ${amount.touched && amount.invalid ? 'has-danger' : ''}`}>
          <label>Amount</label>
          <input type="number" step="0.01" className="form-control" {...amount} />
          { amount.touched && amount.error &&
            <div className="text-help">{amount.error[0]}</div>
          }
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
            { isPayer.touched && isPayer.error &&
              <div className="text-help">{isPayer.error[0]}</div>
            }
          </div>
        </div>
        <input type="submit" className="btn btn-primary" disabled={isSubmitting}
          value={isSubmitting ? 'Submitting...' : 'Submit'} />
        <Link to="/dashboard" className="btn btn-danger" disabled={isSubmitting} >Cancel</Link>
      </form>
    );
  }
}

const rules = {
    description: 'required|max:15',
    participant: 'required|email',
    amount: 'required|numeric|min:0.01',
    isPayer: 'required',
};

function validate(values) {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
}

function mapStateToProps(state) {
  return { bill: state.bill };
}

export default reduxForm({
  form: 'BillNew',
  fields: ['description', 'participant', 'amount', 'isPayer'],
  validate
}, mapStateToProps, { addBill })(BillNew);
