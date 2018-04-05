import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';

/**
 * Sign up form field
 * @function FormField
 * @param {object} props
 * @return {XML} JSX
 */
const FormField = props => (
  <div className={classnames('form-group',
    { 'has-error': props.errors ? !!props.errors[props.name] : false })}>
    <div className={classnames({ 'col-lg-12': props.auth === 'any',
      'col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8': props.auth === 'signin' })}>
      <input
        onChange={ props.onChange }
        type={ props.type ? props.type : 'text' }
        className="form-control" name={ props.name }
        id={ props.name } placeholder={ props.placeholder }
        value={ props.value }
        pattern={ props.pattern }
        title={ props.title }
      />
      { props.errors && props.auth === 'signin' ?
        <span id="show-error" className="show-error help-block error-bg">
          {props.errors[props.name]}
        </span> : false
      }
    </div>
    { props.errors && props.auth === 'any' ?
      <span className="help-block">{props.errors[props.name]}</span> : false
    }
  </div>
);
FormField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.object,
  auth: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string
};
export default FormField;
