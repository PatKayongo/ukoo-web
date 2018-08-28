import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './registration/Registration'
import './App.css';
import './common/Buttons.css';
import './common/Grid.css';
import './common/form/Form.css';
import './common/Notifications.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/register" component={Registration} />
      </Router>
    );
  }
}

export default App;
