import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <form className="login-form">
          <input type="text" className="form-control" placeholder="username" />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <button className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
