import React from 'react';
import classNames from 'classnames';
import 'css/components/about';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={classNames('about container')}>
      <h1 className={classNames('header')}>About Bill Split</h1>
      <div className={classNames('description')}>
        <p>Nothing to see here. Come back soon!</p>
      </div>
    </div>
  );
};

export default About;
