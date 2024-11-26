
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Category } from './Pages/category/Category'
import {Home} from './Pages/home/Home'
import { Order } from './Pages/order/Order'
import {Login} from  './Pages/login/Login'
import {Register} from './Pages/register/Register'
import { Productlist } from './Pages/productlist/Productlist'
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loginSuccess } from './redux/UserRedux'


function App() {
  const user= useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data exists in localStorage on app load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      // If user data exists, parse it and dispatch loginSuccess
      dispatch(loginSuccess(JSON.parse(storedUser)));  // Parse the stored user data and dispatch
    }
  }, [dispatch]);  // Runs only once on mount

  return (
    <div className="app">
      <Navbar/>
      
      <Routes>
        <Route exact path="/" element={user ? <Home/> :<Register/> } />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/category/:product" element={user ? <Category/> :<Login/>} />
        <Route path="/order" element={user ? <Order /> : <Login/>} />
        <Route path="/products/:id" element={user ? <Productlist /> : <Login/>} />

      </Routes>

    </div>
  )
}

export default App
