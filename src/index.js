import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import configureSocket from './actions/socket'
import configureStore from './store/configureStore';

import './index.css';
import App from './components/App'


const store = configureStore();
const socket = configureSocket(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
export default socket