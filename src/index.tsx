// Import everything React needs to work, as well as the App container.
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Render the app.
ReactDOM.render(<App />, document.getElementById('root'));

// Currently, don't register serviceWorker.ts.
serviceWorker.unregister();
