import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import configureStore from './redux/store/configureStore';

const persistedState = localStorage.getItem('ProblemBank1')
  ? JSON.parse(localStorage.getItem('ProblemBank1'))
  : {};

const store = configureStore(persistedState);

store.subscribe(() => {
  localStorage.setItem(
    'ProblemBank1',
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