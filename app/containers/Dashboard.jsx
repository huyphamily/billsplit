import React from 'react';
import { Link } from 'react-router';

export default ({ children }) => {
  return (
    <div className="container">
      <h1 className="text-xs-center">Dashboard</h1>
      <div className="row">
        <div className="col-md-3">
          <Link className="btn btn-primary" to="/dashboard">View Bills</Link>
          <br /><br />
          <Link className="btn btn-secondary" to="/dashboard/new">Add a Bill</Link>
        </div>
        <div className="col-md-9">
          {children}
        </div>
      </div>
    </div>
  );
};
