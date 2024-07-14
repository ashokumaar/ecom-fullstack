import React from 'react'
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import LoginForm from './SpringSecurityComponents/LoginForm'
import HomeNavBar from './Components/HomeNavBar';
import Logout from './SpringSecurityComponents/Logout';
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
import AddressCheck from './Components/AddressCheck';
import SearchResults from './Components/SearchResults';
import PlaceOrder from './Components/PlaceOrder';
import SellerForm from './Components/SellerForm';
import Admin from './SpringSecurityComponents/AdminPage';

function App() {
  return (
    <div className='App'>
      <HomeNavBar />
      <Copyrights/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ecommerce-application' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search/:term' element={<SearchResults/>} />
        <Route path='/auth/register' element={<SignUp />} /> 
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/logout' element={<Logout />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/addressList' element={<AddressCheck/>} />
        <Route path='/payment' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<UserOrders/>} />
        <Route path='/grocery' element={<Groceries/>}/>
        <Route path='/fashion' element={<Fashion/>}/>
        <Route path='/electronics' element={<Electronics/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/travel' element={<Travel/>}/>
        <Route path='settings' element={<Settings/>} />
        <Route path='/seller' element={<SellerForm/>}/>
        <Route path='/admin' element={<Admin/>} />
        <Route path='/helloworld' element={<HelloWorld/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
