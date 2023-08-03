import React from 'react';

const Login = () => {
  return (
    <div>
      <form className="form-control">
        <input type="text" className="form-control" placeholder="username" />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
