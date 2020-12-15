import React from 'react';
import Login from './Containers/Login/Login';
import { BrowserRouter , Route } from 'react-router-dom';
import Homepage from './Containers/Homepage/Homepage';
import Register from './Containers/Register/Register';
import Header from './Components/Header/Header'

import './App.css';

function App() {
  return (
    <BrowserRouter>

    <Route path= "/login" exact>
      <Login />
    </Route>
    <Route path= "/register" exact>
      <Register />
    </Route>

    <Route path= "/homepage" exact>
      <Homepage/> 
    </Route>
    </BrowserRouter>
  );
}

export default App;
