import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import configureStore from './redux/store/configureStore';

const persistedState = localStorage.getItem('ProblemBank')
  ? JSON.parse(localStorage.getItem('ProblemBank'))
  : {};

const store = configureStore(persistedState);

store.subscribe(() => {
  localStorage.setItem(
    'ProblemBank',
    JSON.stringify({
      account: { ...store.getState().account },
    })
  );
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);