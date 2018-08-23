import React from 'react'

const FormItem = ({ label, name, type, onChange }) => (
	<div className="form-item">
		<label htmlFor={name}>{ label }:</label>
		<input id={name} name={name} type={type} onChange={ onChange || (() => {}) } />
	</div>
);

export default FormItem;