import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BasicTable from './BasicTable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BasicTable />, document.getElementById('root'));
registerServiceWorker();
