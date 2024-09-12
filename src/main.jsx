import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx';
import WishListContextProvider, { WishListContext } from './Context/WishListContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <CartContextProvider>
      
      <App />
  
   
    </CartContextProvider>
   
 
   
  </StrictMode>,
)
