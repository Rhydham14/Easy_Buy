import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import ProductDetails from './component/ProductDetails';
import Admin from './component/Adminpage';
import Verify from './component/Verify';
import Cart from './component/Cart';
import ProductPage from './component/Productpage';
function App() {
  console.log(typeof localStorage.getItem("isLogin"));
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home/>} /> 
    <Route path="/login" element={<Login/>} /> 
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/details/:_id" element={<ProductDetails/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/verify" element={<Verify/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/pages/:category" element={<ProductPage/>}/>
    </Routes>
  </Router>
  );
}

export default App;
