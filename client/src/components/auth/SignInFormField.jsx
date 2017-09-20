import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';
// #bfbfbf
const FormField = props => (
    <div className={classnames('form-group',
      { 'has-error': props.errors ? !!props.errors[props.name] : false })}>
      <div
        className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10
        col-sm-offset-2 col-sm-8">
        <input
            onChange={ props.onChange }
            type={ props.type ? props.type : 'text' }
            className="form-control" name={ props.name }
            id={ props.name } placeholder={ props.placeholder }
            value={ props.value }
        />
        { props.errors ?
          <span id="show-error" style={{ backgroundColor: '#ffe6f0' }}
                className="show-error help-block">
            {props.errors[props.name]}
          </span> : false }
      </div>
    </div>
);
FormField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.object
};
export default FormField;

