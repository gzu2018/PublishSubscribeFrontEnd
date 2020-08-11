import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css' // imports bootstrap
import { TopicContextProvider } from './state/context/TopicContext';

ReactDOM.render(
  <React.StrictMode>
    <TopicContextProvider>
      <App />
    </TopicContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
