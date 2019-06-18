// Import React, the App container, and the SCSS files.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/main.scss';
import * as serviceWorker from './serviceWorker';

// Render the app.
ReactDOM.render(<App />, document.getElementById('root'));

// Currently, don't register serviceWorker.ts.
serviceWorker.unregister();
