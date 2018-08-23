import React from 'react';
import FormItem from '../common/form/FormItem'

import './Registration.css';

export default class Registration extends React.Component {
	render() {
		return(
			<div className="grid-container">
				<div className="registration-container container">
					<form>
						<FormItem name="email" type="text" label="Email address:" />
						<FormItem name="password" type="password" label="Password:" />
						<FormItem name="confirm" type="password" label="Confirm password:" />
		
						<div className="action-buttons">
							<input className="button button-primary" type="submit" value="Register" />
						</div>
					</form>
				</div>
			
			</div>
		)
	}
}