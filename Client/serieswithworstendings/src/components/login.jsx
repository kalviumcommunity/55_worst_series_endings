
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

      const response = await axios.post('/Login', { username, password });
      if (response.status === 200) {
        navigate(`/update/${response.data.id}`); 
      } else {
        setLoginMessage('Invalid Credentials');
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
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
        {loginMessage && <div className="error-message">{loginMessage}</div>}
        <br></br>

        <button type="submit" className="button">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
