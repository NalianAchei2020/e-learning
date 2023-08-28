import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { dispatch } = useContext(StoreContext);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setErrMessage('Please fill in all the fields');
    }
    const user = {
      email,
      password,
    };
    try {
      const response = await axios('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: JSON.stringify(user),
        withCredentials: true,
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      const data = response.data;
      const message = response.data.message;
      dispatch({ type: 'LOGIN_NAME', payload: data.username });
      setErrMessage(message);
      if (data.role === 'Admin') {
        navigate('/admin');
      }
      if (data.role === 'CodeReviewer') {
        navigate('/reviewerdashboard');
      }
      if (data.role === 'Student') {
        navigate('/progress-section-link');
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      if (err.message === 'Request failed with status code 404') {
        setErrMessage('User not found');
      } else if (err.message === 'Request failed with status code 400') {
        setErrMessage('Wrong email or password!');
      } else {
        setErrMessage(err.message);
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <form className="login-form" onSubmit={login}>
          <p className="error">{errMessage}</p>
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-button mb-5">Login</button>
          <br /> <br /> <br /> <br /> <br />
          <h6>
            <a href="#forgot" className=" text-white">
              Forgot Password?
            </a>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Login;
