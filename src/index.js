import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/store/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';

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
      <CssBaseline />
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);