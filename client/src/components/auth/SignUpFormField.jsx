/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

const FormField = props => (
    <div className={classnames('form-group', { 'has-error': props.errors ? !!props.errors[props.name] : false })}>
      <div className="col-lg-12">
        <input
            onChange={ props.onChange }
            type={ props.type ? props.type : 'text' }
            className="form-control" name={ props.name }
            id={ props.name } placeholder={ props.placeholder }
            value={ props.value }
        />
      </div>
      { props.errors ? <span className="help-block">{props.errors[props.name]}</span> : false }
    </div>
);
export default FormField;
// required={ props.required ? false : true }
