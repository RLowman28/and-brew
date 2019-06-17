// Import React and the overall app.
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

// Test that the app renders.
it('renders without crashing', () => {
  // Render the app and test that something rendered.
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
