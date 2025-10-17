import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './css/main.css';
import App from './App';
import store from './store/store';

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);

root.render(
<Provider store={store}>
  <App />
</Provider>);