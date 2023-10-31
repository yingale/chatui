// Forms.js
import React, { useState } from 'react';
import '../../src/styles/Form.css';
import { postUserData, login } from '../Integration';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        let userData = { "email": email, "password": password };
        console.log(userData)
        let login_data = await login(userData);
        console.log(login_data)
        let userDetails = { "username": login_data.username, "token": login_data.access_token, "uid": login_data.uid }
        localStorage.setItem("userdata", JSON.stringify(userDetails));
        setLoginMessage('Login successful!');
        window.location.replace('/chat');
      } catch (error) {
        console.error('Registration failed:', error);
        setLoginMessage('Incorrect email and password. Please try again.');
      }
    } else {
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="text-danger">{loginMessage}</p>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Replace this with your actual registration logic
    if (password === confirmPassword) {
      try {
        let userData = { "email": email, "username": username, "password": password };
        await postUserData(userData);
        setRegistrationMessage('Registration successful!');
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationMessage('Registration failed. Please try again.');
      }
    } else {
      setRegistrationMessage('Password and confirm password must match.');
    }
  };

  return (
    <div className="form-container">
      <h2>Chat Registration</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">UserName</label>
          <input
            type="username"
            className="form-control"
            id="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <p className="text-danger">{registrationMessage}</p>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export { LoginForm, RegistrationForm };
