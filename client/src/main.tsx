import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from './App.tsx';
import AuthProvider from './contexts/AuthContext.tsx';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster position="bottom-center" />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>,
);
