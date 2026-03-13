import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import store from './Features/store.js'

import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
defaultOptions: {
    queries: {
      retry: 1,                      
      refetchOnWindowFocus: false,   
    },
  },
});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

       <App />

      </QueryClientProvider>


    </Provider>
  
  // </StrictMode>,
)
