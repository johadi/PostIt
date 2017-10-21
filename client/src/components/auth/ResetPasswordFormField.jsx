import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';

/**
 * Reset password form field
 * @function ResetPasswordFormField
 * @param {object} props
 * @return {XML} JSX
 */
const ResetPasswordFormField = props => (
  <div className={classnames('form-group',
    { 'has-error': props.errors ? !!props.errors[props.name] : false })}>
    <div className="col-lg-12">
      <input
        onChange={ props.onChange }
        type={ props.type ? props.type : 'text' }
        className="form-control" name={ props.name }
        id={ props.name } placeholder={ props.placeholder }
        value={ props.value }
      />
    </div>
    { props.errors ?
      <span className="help-block">
        {props.errors[props.name]}
      </span> : false }
  </div>
);
ResetPasswordFormField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.object
};
export default ResetPasswordFormField;
