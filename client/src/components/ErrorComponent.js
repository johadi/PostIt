import React from 'react';

const ErrorComponent = props => (
     <div className="alert alert-danger alert-dismissible">
       { props.fails }
     </div>
 );
export default ErrorComponent;
