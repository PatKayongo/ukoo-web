import PropTypes from 'prop-types';
import React from 'react';

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showErrorMessage: false };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleInputChange(event) {
    this.setState({ validationErrorMessage: null });
    const { validators, onChange, name } = this.props;

    let isValid = true;
    if (validators) {
      for (let i = 0; i < validators.length; i += 1) {
        const validationResult = validators[i](event.target.value);
        if (validationResult) {
          isValid = false;
          this.setState({ validationErrorMessage: validationResult });
          break;
        }
      }
    }

    if (onChange) {
      onChange({ valid: isValid, name, value: event.target.value });
    }
  }

  handleInputBlur() {
    this.setState({ showErrorMessage: true });
  }

  render() {
    const { validationErrorMessage, showErrorMessage } = this.state;
    const { errorMessage, name, label, type, value } = this.props;
    const error = errorMessage || validationErrorMessage;

    return (
      <div className="form-item">
        <label htmlFor={name}>
          {label}
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </label>
        {error && showErrorMessage && <span className="error">{error}</span>}
      </div>
    );
  }
}

FormItem.propTypes = {
  validators: PropTypes.arrayOf(PropTypes.func),
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

FormItem.defaultProps = {
  validators: [],
  onChange: () => {},
  errorMessage: null,
  type: 'text',
  value: '',
};

export default FormItem;
