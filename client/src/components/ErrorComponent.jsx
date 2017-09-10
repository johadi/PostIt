import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';

const ErrorComponent = props => (
     <div id='error' className={classnames('alert alert-danger alert-dismissible',
       { 'col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8':
         props.show })}>
       <button type="button" className="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">x</span>
       </button>
       { props.fails }
     </div>
 );
ErrorComponent.propTypes = {
  fails: PropTypes.string,
  show: PropTypes.bool
};
export default ErrorComponent;
