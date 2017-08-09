/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

const FormField = props => (
    <div className={classnames('form-group', { 'has-error': props.errors ? !!props.errors[props.name] : false })}>
      <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
        <input
            onChange={ props.onChange }
            type={ props.type ? props.type : 'text' }
            className="form-control" name={ props.name }
            id={ props.name } placeholder={ props.placeholder }
            value={ props.value }
        />
        { props.errors ? <strong><span className="help-block">{props.errors[props.name]}</span></strong> : false }
      </div>
    </div>
);
export default FormField;
// required={ props.required ? false : true }

