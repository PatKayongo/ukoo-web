import React from 'react';
import { shallow } from 'enzyme';
import FormItem from './FormItem';
import { EmailAddressValidator } from './validators';

describe('Form Item', () => {
  it('should display the label', () => {
    const wrapper = shallow(
      <FormItem name="inputName" type="text" label="My Label:" />
    );
    const label = wrapper.find('label');
    expect(label.text().trim()).toEqual('My Label:');
    expect(label.props().htmlFor).toEqual('inputName');
  });

  it('should set the type on the input', () => {
    const wrapper = shallow(
      <FormItem name="name" type="password" label="My Label" />
    );
    const input = wrapper.find('input');
    expect(input.props().type).toEqual('password');
  });

  it('should set the name and id of input based on the "name" prop', () => {
    const wrapper = shallow(
      <FormItem name="username" type="password" label="My Label" />
    );
    const input = wrapper.find('input');
    expect(input.props().id).toEqual('username');
    expect(input.props().name).toEqual('username');
  });

  it('should not show the validation error message if blur has not happened', () => {
    const wrapper = shallow(
      <FormItem
        name="username"
        type="password"
        label="My Label"
        validators={[EmailAddressValidator('Email Address Required')]}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'not-an-email' } });

    const errorSpan = wrapper.find('span.error');
    expect(errorSpan.exists()).toBe(false);
  });

  it('should show the validation error message', () => {
    const wrapper = shallow(
      <FormItem
        name="username"
        type="password"
        label="My Label"
        validators={[EmailAddressValidator('Email Address Required')]}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'not-an-email' } });
    input.simulate('blur');

    const errorSpan = wrapper.find('span.error');
    expect(errorSpan.text().trim()).toEqual('Email Address Required');
  });

  it('should show the prop error message over the validation message', () => {
    const wrapper = shallow(
      <FormItem
        name="username"
        type="password"
        label="My Label"
        errorMessage="Something has gone wrong"
        validators={[EmailAddressValidator('Email Address Required')]}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'not-an-email' } });
    input.simulate('blur');

    const errorSpan = wrapper.find('span.error');
    expect(errorSpan.text().trim()).toEqual('Something has gone wrong');
  });

  it('should call the onChange function when the value changes', () => {
    const changeHandler = jest.fn();
    const wrapper = shallow(
      <FormItem
        name="username"
        type="password"
        label="My Label"
        onChange={changeHandler}
      />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'new value' } });
    expect(changeHandler).toHaveBeenCalledWith({
      valid: true,
      name: 'username',
      value: 'new value',
    });
  });

  it('should set the value that has been passed in', () => {
    const wrapper = shallow(
      <FormItem
        name="username"
        type="password"
        label="My Label"
        value="initial value"
      />
    );

    const input = wrapper.find('input');
    expect(input.props().value).toEqual('initial value');
  });
});
