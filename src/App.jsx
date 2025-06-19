import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Home from './home.jsx';
import Account from './account.jsx';
import Test from './test.jsx';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/register" replace/>}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/test' element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;