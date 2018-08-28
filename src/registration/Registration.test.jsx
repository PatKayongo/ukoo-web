import React from 'react';
import { shallow } from 'enzyme';
import Registration from './Registration';
import registrationService from './registration-service';

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Registration component', () => {
  let wrapper;

  beforeAll(() => {
    jest.spyOn(registrationService, 'register');
  });

  beforeEach(() => {
    registrationService.register.mockReset();
    registrationService.register.mockReturnValue(Promise.resolve({}));
    wrapper = shallow(<Registration />);
  });

  afterAll(() => {
    registrationService.register.mockRestore();
  });

  const changeField = (name, value, valid = true) => {
    const input = wrapper.find(`[name="${name}"]`);
    input.simulate('change', {
      valid,
      name,
      value,
    });
  };

  const clickRegisterButton = () => {
    const registerButton = wrapper.find('#registerButton');
    registerButton.simulate('click', { preventDefault: () => {} });
  };

  const getRegisterButton = () => {
    return wrapper.find('#registerButton');
  };

  it('should set the register button to disabled initially', () => {
    expect(getRegisterButton().props().disabled).toBe(true);
  });

  it('should set the register button to enabled if all fields are valid', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'P@ssword');

    expect(getRegisterButton().props().disabled).toBe(false);
  });

  it('should set the error message of the confirmation field if no match', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'Different-P@ssword');

    const confirmField = wrapper.find('[name="confirm"]');
    expect(confirmField.props().errorMessage).toEqual('Passwords do not match');
  });

  it('should disable the register button if passwords dont match if no match', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'Different-P@ssword');

    expect(getRegisterButton().props().disabled).toBe(true);
  });

  it('should set the error message of the confirmation field to null if match', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'P@ssword');

    const confirmField = wrapper.find('[name="confirm"]');
    expect(confirmField.props().errorMessage).toBeNull();
  });

  it('should call the registration service when register button is clicked', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'P@ssword');

    clickRegisterButton();
    expect(registrationService.register).toHaveBeenCalledWith(
      'a@b.com',
      'P@ssword'
    );
  });

  it('should disable the button when the the service has been called', () => {
    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'P@ssword');

    clickRegisterButton();
    expect(getRegisterButton().props().disabled).toBe(true);
  });

  it('should show an error message if an error is returned from the service', async () => {
    const promiseRejection = Promise.reject(new Error('Oh dear'));
    registrationService.register.mockReturnValue(promiseRejection);

    changeField('email', 'a@b.com');
    changeField('password', 'P@ssword');
    changeField('confirm', 'P@ssword');
    clickRegisterButton();

    await flushPromises();
    const errorNotification = wrapper.find('.error.notification');
    expect(errorNotification.text().trim()).toEqual('Oh dear');
    expect(getRegisterButton().props().disabled).toBe(false);
  });
});
