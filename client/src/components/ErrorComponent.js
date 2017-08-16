import React from 'react';
import classnames from 'classnames';

const ErrorComponent = props => (
     <div className={classnames('alert alert-danger alert-dismissible',
         { 'col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8': props.show })}>
       { props.fails }
     </div>
 );
export default ErrorComponent;
