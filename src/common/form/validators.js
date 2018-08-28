const RequiredValidator = validationMessage => value => value && value.trim().length ? null : validationMessage;

const EmailAddressValidator = validationMessage => (value) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value) ? null : validationMessage;
};

const MinimumLengthValidator = (validationMessage, minimumLength) => value => (value && value.trim().length >= minimumLength ? null : validationMessage);

export { EmailAddressValidator, RequiredValidator, MinimumLengthValidator };
