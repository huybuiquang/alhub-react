import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({labelName, type, id, name, value, placeholder, onChange, error}) => {
    return (
        <div className="form-group">
          <label htmlFor={name}>{labelName}</label>
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={
              error ? "form-control is-invalid" : "form-control"
            }
          />
          <div className="invalid-feedback">{error}</div>
        </div>
    );
};

InputField.propTypes = {
    labelName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
InputField.defaultProps = {
    error: undefined,
    placeholder: ''
};

export default InputField;