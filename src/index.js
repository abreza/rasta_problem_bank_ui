import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './root/Root';
import configureStore from './redux/store/configureStore';


const persistedState = localStorage.getItem('rastaReactState444')
  ? JSON.parse(localStorage.getItem('rastaReactState444'))
  : {};

const store = configureStore(persistedState);

store.subscribe(() => {
  // localStorage.clear();
  localStorage.setItem(
    'rastaReactState444',
    JSON.stringify({
      account: { ...store.getState().account },
    })
  );
});



ReactDOM.render(

  <Router>
    <Provider store={store}>
      <Root />
    </Provider>
  </Router>,
  document.getElementById('root')
);