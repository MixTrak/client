import React, { useState, useEffect } from "react";
import News from "./news";
import './test.css';
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate('/login');
    } else {
      setUser({ name: email.split('@')[0] }); // Mock user data based on email
    }
  }, [navigate]);

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === 'account') {
      navigate('/account');
    } else if (value === 'logout') {
      localStorage.removeItem('userEmail');
      navigate('/login');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <select className='profile' defaultValue="" onChange={handleChange}>
        <option value="" disabled hidden>{user.name.charAt(0)}</option>
        <option className="accountInfo" value="account">Account Info</option>
        <option className="logout" value="logout">Logout</option>
      </select>
      <h1>Welcome, {user.name}!</h1>
      <News />
    </>
  );
}

export default Test;