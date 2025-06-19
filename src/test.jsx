import React from 'react';
import './test.css';
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();

  return (
    <div className="test-container">
      <h1 className="test-title">Welcome to the Test Path</h1>
      <p className="test-description">This Path Was Used For Testing</p>
      <button className="test-button" onClick={() => navigate('/home')}>Go to Home</button>
      <footer className="test-footer">
        <p>© 2025 Account Creation System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Test;