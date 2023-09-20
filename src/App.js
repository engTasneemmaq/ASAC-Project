
import './App.css';
import {withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Api from './Api';
import Profile from './Profile';
import Category from './categories'
import Header from './header';
import Signup from './signup';
import Contact from './Contact';
import About from './About';
import Logout from './Logout';
import Login from './Login';
import Home from './Home';
import Footer from './Footer';

function App() {
  
  return (
    <>
    <Header />
    <Router>
    <Routes>
      <Route exact path='/login' Component={Login}></Route>
      <Route exact path='/profile' Component={Profile}></Route>
      <Route exact path='/logout' Component={Logout}></Route>
      <Route exact path='/' Component={Home}></Route>
      <Route exact path='/categories' Component={Category}></Route>
      <Route exact path='/api' Component={Api}></Route>
      <Route exact path='/about' Component={About}></Route>
      <Route exact path='/contact' Component={Contact}></Route>
      <Route exact path='/signup' Component={Signup}></Route>     
      <Route exact path='/profile' Component={Profile}></Route>      
      </Routes>
    </Router>
    <Footer />
  </>
  );
}

export default withAuth0(App);