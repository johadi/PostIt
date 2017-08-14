import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from './store/store';
import './build/static/styles/cover.scss';
import './build/static/styles/auth-custom.scss';
import './build/static/styles/group-custom.scss';
import './build/static/styles/font-awesome/css/font-awesome.css';
import routes from './routes';
// import App from './AppTest';

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);

// ReactDOM.render(<App/>, document.getElementById('app'));

