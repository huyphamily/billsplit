import React from 'react';

export default ({ children }) => {
  return (
    <div>
      <div>
        <input type="button" value="View Bills" />
        <input type="button" value="Add a Bill" />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
