import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/store';
import axios from 'axios';
import { getUserInfo } from '../../localStorage';

const UsersForm = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { token } = getUserInfo();
  const { users, isAuthenticated, loading, error } = state;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '' || role === '') {
      setErrorMessage('Please fill in all the fields');
      return;
    }
    const user = {
      username,
      email,
      password,
      role,
    };
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        user
      );
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      setErrorMessage(response.data.message);
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        playload: err.message,
      });
      if (err.message === 'Request failed with status code 409') {
        setErrorMessage('User already exist');
      } else if (err.message === 'Request failed with status code 500') {
        console.log(err.message);
        setErrorMessage('Server error: Email already exist');
      } else {
        console.log(err.message);
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/api/users/',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          AUthorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <section className="display-users">
        <table></table>
      </section>
      <section className="regieter-form">
        <form onSubmit={handleRegister}>
          <p className="error">{errorMessage}</p>
          <input
            type="text"
            className="form-input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="email"
            className="form-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="form-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <select
            className="form-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value=""></option>
            <option value="Student">Student</option>
            <option value="CodeReviewer">Code Reviewer</option>
            <option value="Admin">Admin</option>
          </select>
          <br />
          <button className="register-btn" type="submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default UsersForm;
