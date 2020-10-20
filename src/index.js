import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './root/Root';
import configureStore from './redux/store/configureStore';


const persistedState = localStorage.getItem('rastaReactState44')
  ? JSON.parse(localStorage.getItem('rastaReactState44'))
  : {};

const store = configureStore();

store.subscribe(() => {
  // localStorage.clear();
  localStorage.setItem(
    'rastaReactState44',
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