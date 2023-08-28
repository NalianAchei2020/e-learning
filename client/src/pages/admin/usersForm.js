/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/store';
import axios from 'axios';

const UsersForm = () => {
  const { dispatch } = useContext(StoreContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [Users, setUsers] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [deleteErr, setDeleteErr] = useState('');

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
      window.location.reload();
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
          withCredentials: true,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/users/:id'
      );
      const data = response.data;
      setDeleteMsg(data);
      //window.location.reload();
    } catch (error) {
      setDeleteErr(error);
    }
  };

  return (
    <div className="register">
      <section className="display-users">
        <h3 className="text-center mt-3">All Users</h3>
        <br />
        <p style={{ color: 'blue' }}>{deleteMsg}</p>
        <p style={{ color: 'red' }}>{deleteErr}</p>
        <table className="table table-striped table-hover table-bordered table-responsive-sm mt-3">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
            {Users.map((user) => (
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-danger dan" onClick={deleteUser}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn btn-success">Update</button>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </section>
      <br />
      <section className="regieter-form">
        <h3 className="header">Register a New User to the System</h3>
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
