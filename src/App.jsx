import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'
import Table from './components/Table';
import Form from './components/Form';
import './style.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Form />
        <Table />
      </Provider>
    );
  }
}

export default App;
