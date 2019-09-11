import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import configureStore from './redux/configureStore';

const store = configureStore();

const renderApp = (Component) => render(
  <AppContainer>
    <Provider store={store}>
      <Component />
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(App);
  });
}
