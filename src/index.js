import React from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import store from './Components/store/store';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
    <App />
</Provider>
);
