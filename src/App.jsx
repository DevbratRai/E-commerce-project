import './App.css';
import Button from "@mui/material/Button";
import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/checkout';
import Register from './pages/Register';
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider, { useAuth } from './firebase/Auth';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={"/login"} />
  }
  return children;


}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Checkout" element={
           <ProtectedRoute>
             <Checkout />
          
           </ProtectedRoute>
         } />
       
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      

    </>)
);

function App() {


  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

    </AuthProvider>

  );
}
export default App
