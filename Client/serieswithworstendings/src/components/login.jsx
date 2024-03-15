import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; 
import backarrow from '../assets/backarrow.png'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 6) {
        setLoginMessage("Password should be more than 5 characters");
        return;
      }

      const response = await axios.post('https://five5-worst-series-endings-1.onrender.com/login', { username, password });
      if (response.status === 200) {
        navigate('/'); 
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    }
  };

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <div className="Form"> 
      <img src={backarrow} alt="" id='backarrow' onClick={handleBack} />
      <form className="animated-form" onSubmit={handleSubmit}> 
        <label>Username:</label>
        <input 
          type="text" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <br></br>

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {loginMessage && <div id="error-message">{loginMessage}</div>}
        <br></br>

        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
