import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
// import Register from './components/Register/Register'
import About from './components/About/About'
// import Brands from './components/Brands/Brands'
// import Cart from './components/Cart/Cart'
// import Categories from './components/Categories/Categories'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import CounterContextProvider, { CounterContext } from './Context/CounterContext'
import UesrTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider, { CartContext } from './Context/CartContext'
import  { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import Order from './components/Order/Order'
import { Offline, Online } from 'react-detect-offline'
import WishListContextProvider from './Context/WishListContext'
// import WhishList from './components/WishList/WishList'
// import BrandsDetails from './components/BrandsDetails/BrandsDetails'
// import CatergoriesDetails from './components/CatergoriesDetails/CatergoriesDetails'

let Home=lazy(()=>import('./components/Home/Home'))
let Register=lazy(()=>import('./components/Register/Register'))
let Cart=lazy(()=>import('./components/Cart/Cart'))
let Brands=lazy(()=>import('./components/Brands/Brands'))
let Categories=lazy(()=>import('./components/Categories/Categories'))
let WishList=lazy(()=>import('./components/WishList/WishList'))
let BrandsDetails=lazy(()=>import('./components/BrandsDetails/BrandsDetails'))
let CatergoriesDetails=lazy(()=>import('./components/CatergoriesDetails/CatergoriesDetails'))


const routes = createBrowserRouter([
  {
    path: "/", element: <LayOut />, children: [
      { path: "/", element: 
        <Suspense fallback={"<h1>Loading register Page</h1>"}>
        <Register/>
      </Suspense>
      },
      { path: "home", element: <ProtectedRoutes>
        <Suspense fallback={"<h1>Loading Home Page</h1>"}>
          <Home/>
        </Suspense>
      </ProtectedRoutes> },
      { path: "about", element: <ProtectedRoutes><About /></ProtectedRoutes> },
      { path: "brands", element:    <Suspense fallback={"<h1>Loading brands Page</h1>"}>
      <Brands/>
    </Suspense> },
      { path: "brandsDetails/:brandId", element: <ProtectedRoutes>
         <Suspense fallback={"<h1>Loading brands details Page</h1>"}>
          <BrandsDetails/>
        </Suspense>
      </ProtectedRoutes> },
      { path: "cart", element: <ProtectedRoutes> <Suspense fallback={"<h1>Loading cart Page</h1>"}>
      <Cart/>
    </Suspense></ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes>    <Suspense fallback={"<h1>Loading categories Page</h1>"}>
      <Categories/>
    </Suspense></ProtectedRoutes> },
      { path: "contact", element: <ProtectedRoutes><Contact /></ProtectedRoutes> },
      { path: "wishlist", element: <ProtectedRoutes>
        <Suspense fallback={"<h1>Loading wishlist Page</h1>"}>
          <WishList/>
        </Suspense>
      </ProtectedRoutes> },
      { path: "allorders", element: <ProtectedRoutes><Order/></ProtectedRoutes> },
      { path: "categoriesDetails/:categoryId", element: <ProtectedRoutes>
         <Suspense fallback={"<h1>Loading categories details Page</h1>"}>
          <CatergoriesDetails/>
        </Suspense>
      </ProtectedRoutes> },
      { path: "checkout/:cartId", element: <ProtectedRoutes><CheckOut/></ProtectedRoutes> },
      { path: "productDetails/:id/:categoryId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: "login", element: <Login /> },

      { path: "*", element: <NotFound /> },


    ]
  }
])

function App() {
  const [count, setCount] = useState(0)
let{getCart,setCartItemsNo}=useContext(CartContext)
  useEffect(()=>{
    getCartInfo()
  },[])
  async function getCartInfo(){
    let res= await getCart()
    
    console.log(res);

    if(res.data){
     
    
      setCartItemsNo(res.numOfCartItems)
     
    }
   
    
   
    }
  return (

   
      <UesrTokenContextProvider>

        <CounterContextProvider>
<WishListContextProvider>
<RouterProvider router={routes}>
</RouterProvider>
</WishListContextProvider>
       
           
          
         
          
       
          <Offline>
          <div className=' bg-red-400 fixed bottom-0 left-0 p-4'> 
          Only shown offline (surprise!)
          </div>
            
            </Offline>
          <Toaster/>
        </CounterContextProvider>
      </UesrTokenContextProvider>



    





  )
}

export default App
