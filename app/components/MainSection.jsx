import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import 'css/components/main-section';

const MainSection = () => {
  return (
    <div className={classNames('main-section')}>
      <div className={classNames('container text-xs-center')}>
        <h1 className={classNames('display-4')}>Easily keep track of bills with friends</h1>
        <p>
          <Link className={classNames('btn btn-lg btn-info')} to="/dashboard">Get Started</Link>
        </p>
      </div>
    </div>
  );
};

export default MainSection;
