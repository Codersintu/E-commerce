
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


function App() {
 
  return (
    <div className="app"> 
      <Navbar/>
      
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:product" element={<Category/>} />
        <Route path="/order" element={ <Order />} />
        <Route path="/products/:id" element={<Productlist />} />

      </Routes>

    </div>
  )
}

export default App
