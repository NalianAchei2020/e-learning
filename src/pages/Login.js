import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <form className="login-form">
          <input type="text" className="form-input" placeholder="username" />
          <br />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
          />
          <br />
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
