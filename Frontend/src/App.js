import React from 'react'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import NotFound from './Components/NotFound';
import Customer from './Components/Customer';
import Products from './Components/Products';
import Orders from './Components/UserOrders';
import LoginForm from './SpringSecurityComponents/LoginForm'
import Welcome from './SpringSecurityComponents/Welcome';
// import UserProfile from './SpringSecurityComponents/UserProfile';
// import AddNewUser from './SpringSecurityComponents/SignUp';
import NavBar2 from './SpringSecurityComponents/NavBar2';
import Logout from './SpringSecurityComponents/Logout';
import Seller from './Components/Seller';
import Copyrights from './Components/Copyrights';
import Settings from './Components/Settings';
import HelloWorld from './Components/HelloWorld';
import Fashion from './Components/Fashion/Shopping';
import Electronics from './Components/Electronics/Shopping';
import Books from './Components/Books/Shopping';
import Groceries from './Components/Groceries/Shopping';
import Travel from './Components/Travel/Shopping';
import SignUp from './SpringSecurityComponents/SignUp';
import Cart from './Components/Cart';
import UserOrders from './Components/UserOrders';

function App() {
  return (
    <div className='App'>
      <NavBar2 />
      {/* <NavBarServices/> */}
      <Copyrights/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ecommerce-application' element={<Home />} />
        <Route path='/home' element={<Home />} />        
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/customers' element={<Customer />} />
        <Route path='/products' element={<Products />} />
        <Route path='/orders' element={<UserOrders/>} />
        <Route path='/orders2' element={<Orders/>} />
        <Route path='/auth/register' element={<SignUp />} /> 
        <Route path='/auth/welcome' element={<Welcome />} />
        {/* <Route path='/auth/user/userProfile' element={<UserProfile />} /> */}
        <Route path='/auth/addNewUser' element={<SignUp />} />
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/grocery' element={<Groceries/>}/>
        <Route path='/fashion' element={<Fashion/>}/>
        <Route path='/electronics' element={<Electronics/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/travel' element={<Travel/>}/>
        <Route path='settings' element={<Settings/>} />
        <Route path='/auth/logout' element={<Logout />} />
        <Route path='/seller' element={<Seller/>}/>
        <Route path='/helloworld' element={<HelloWorld/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default App;
