import React from "react";
import News from "./news";
import Account from "./account";
import './test.css';
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === 'account') {
      navigate('/account');
    } else if (value === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <>
    <select className='profile' defaultValue="" onChange={handleChange}>
      <option value="" disabled hidden>{user.name.charAt(0)}</option>
      <option className="accountInfo" value="account">Account Info</option>
      <option className="logout" value="logout">Logout</option>
    </select>
    <h1>Welcome,{user.name}!</h1>
    <News />
  </>
  );
}

export default Test;