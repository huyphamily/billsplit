import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = () => {
  return (
    <div className={cx('main-section')}>
      Hello World.
    </div>
  );
};

export default MainSection;
