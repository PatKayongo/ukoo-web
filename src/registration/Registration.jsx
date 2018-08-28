import React from 'react';
import FormItem from '../common/form/FormItem';
import {
  EmailAddressValidator,
  RequiredValidator,
  MinimumLengthValidator,
} from '../common/form/validators';
import registraionService from './registration-service';
import './Registration.css';

const emailAddressValidator = EmailAddressValidator(
  'Email address is not correct',
);
const emailRequiredValidator = RequiredValidator('Email address is required');
const passwordRequredValidator = RequiredValidator('Password is required');
const passwordMinimumLength = MinimumLengthValidator(
  'Password should be at least 8 characters',
  8,
);
const confirmationValidator = RequiredValidator(
  'Password confirmation is required'
);

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        valid: false,
        value: null,
      },
      password: {
        valid: false,
        value: null,
      },
      confirm: {
        valid: false,
        value: null,
      },
      confirmationError: null,
      registrationDetailsSubmitting: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
    this.handleRegisterButtonClick = this.handleRegisterButtonClick.bind(this);
  }

  handleEmailChange(email) {
    this.setState({ email: { valid: email.valid, value: email.value } });
  }

  handlePasswordChange(password) {
    this.setState({
      password: { valid: password.valid, value: password.value },
    });
  }

  handleConfirmChange(confirm) {
    const { password } = this.state;
    const passwordMatch = confirm.value === password.value;
    const confirmationError = passwordMatch ? null : 'Passwords do not match';

    this.setState({
      confirm: {
        valid: confirm.valid && passwordMatch,
        value: confirm.value,
      },
      confirmationError,
    });
  }

  handleRegisterButtonClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({ registrationDetailsSubmitting: true });
    registraionService.register(email.value, password.value).catch((error) => {
      this.setState({
        submissionError: error.message,
        registrationDetailsSubmitting: false,
      });
    });
  }

  render() {
    const {
      email,
      password,
      confirm,
      confirmationError,
      registrationDetailsSubmitting,
      submissionError,
    } = this.state;

    return (
      <div className="grid-container">
        <div className="registration-container container">
          <p>Join Ukoo today!</p>
          {submissionError && (
            <p className="error notification">{submissionError}</p>
          )}

          <form>
            <FormItem
              name="email"
              type="text"
              label="Email address:"
              value={email.value}
              onChange={this.handleEmailChange}
              validators={[emailRequiredValidator, emailAddressValidator]}
            />

            <FormItem
              name="password"
              type="password"
              label="Password:"
              value={password.value}
              onChange={this.handlePasswordChange}
              validators={[passwordRequredValidator, passwordMinimumLength]}
            />

            <FormItem
              name="confirm"
              type="password"
              label="Confirm password:"
              value={confirm.value}
              onChange={this.handleConfirmChange}
              validators={[confirmationValidator]}
              errorMessage={confirmationError}
            />

            <div className="action-buttons">
              <input
                id="registerButton"
                disabled={
                  !email.valid
                  || !password.valid ||
                  !confirm.valid ||
                  registrationDetailsSubmitting
                }
                className="button button-primary"
                type="submit"
                onClick={this.handleRegisterButtonClick}
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
