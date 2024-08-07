import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import "swiper/css"
import "swiper/css/navigation"
import App from './App.tsx'
import { CategoryProvider } from './contexts/CategoryContext.tsx'
import { ProductProvider } from './contexts/ProductContext.tsx'
import './index.scss'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <CategoryProvider>
          <AuthProvider>
            <UserProvider>
            <App />
            </UserProvider>
          </AuthProvider>
        </CategoryProvider>
      </ProductProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
