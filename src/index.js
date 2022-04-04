import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import reducers from './reducers';
import { BrowserRouter } from "react-router-dom";
import { register } from './serviceWorker';

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
register()