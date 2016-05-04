import React, { Component } from 'react-native';
import { Provider } from 'react-redux';

import Navigation from './components/navigation';
import configureStore from './store';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
