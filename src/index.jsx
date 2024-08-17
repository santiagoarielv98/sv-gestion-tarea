import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

// project import
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

