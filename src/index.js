import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import '../node_modules/bootstrap/dist/css/bootstrap.css';
=======
import 'bootstrap/dist/css/bootstrap.css';
>>>>>>> a650f05596fd1194c4c2d87c20dc7884dc01fbf1
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
