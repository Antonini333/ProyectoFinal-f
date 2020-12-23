import React from 'react';
import Login from './Containers/Login/Login';
import { BrowserRouter , Route } from 'react-router-dom';
import Homepage from './Containers/Homepage/Homepage';
import Register from './Containers/Register/Register';
import Navbar from './Components/Navbar/Navbar'
import People from './Containers/People/People'
import './App.css';

function App() {
  return (
    <BrowserRouter>

    <Route path= "/login" exact>
      <Login />
    </Route>
    <Route path= "/" exact>
      <Register />
    </Route>

    <Route path= "/homepage" exact>
      <Navbar/>
      <Homepage/> 
    </Route>

    <Route path= "/people" exact>
      <Navbar/>
      <People/> 
    </Route>
    </BrowserRouter>
  );
}

export default App;
