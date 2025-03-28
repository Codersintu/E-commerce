
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
  // const user= useSelector((state)=>state.user.currentUser);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Check if user data exists in localStorage on app load
  //   const storedUser = localStorage.getItem('currentUser');
  //   if (storedUser) {
  //     // If user data exists, parse it and dispatch loginSuccess
  //     dispatch(loginSuccess(JSON.parse(storedUser)));  // Parse the stored user data and dispatch
  //   }
  // }, [dispatch]);  // Runs only once on mount
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
