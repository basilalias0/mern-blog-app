import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { Provider } from 'react-redux'
import Store from './Redux/Store';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={Store}>
     <App />
     </Provider>
    </QueryClientProvider>
     
    
  </React.StrictMode>
);
