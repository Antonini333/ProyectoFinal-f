import React from 'react';
import Login from './Containers/Login/Login';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <BrowserRouter>

    <Route path= "/" exact>
      <Login />
    </Route>
    </BrowserRouter>
  );
}

export default App;
