import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './features/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader';
import { DateProvider } from './utils/dateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DateProvider>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </DateProvider>
  </React.StrictMode>
);

