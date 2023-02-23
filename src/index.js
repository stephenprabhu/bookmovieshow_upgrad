import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import UserProvider from './helpers/context/UserProvider';

ReactDOM.render(<UserProvider><Controller /></UserProvider>, document.getElementById('root'));
registerServiceWorker();
