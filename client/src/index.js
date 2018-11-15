import React from 'react';
import ReactDOM from 'react-dom';
import BulletinApp from './components/js/BulletinApp';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <BrowserRouter>
    <BulletinApp />
  </BrowserRouter>,  
  document.getElementById('root'));
//registerServiceWorker();