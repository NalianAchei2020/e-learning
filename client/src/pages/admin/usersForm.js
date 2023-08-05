import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/store';
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { queries } from '@testing-library/react';

db.version(1).stores({
  users: '++id, name, email, password, role, isAdmin',
});

const { users } = db;

const UsersForm = () => {
  const allUsers = useLiveQuery(() => users.toArray());
  console.log(allUsers);

  const { state, dispatch } = useContext(StoreContext);
  const { db } = state;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  console.log(username, email, password, role);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '' || role === '') {
      setErrorMessage('Please fill in all the fields');
      return;
    }
    if (role === 'Admin') {
      setIsAdmin(true);
    }
    await users.add({
      username: username,
      email: email,
      password: password,
      role: role,
      isAdmin: isAdmin,
    });
  };

  return (
    <div className="register">
      <section className="display-users">
        <table></table>
      </section>
      <section className="regieter-form">
        <form onSubmit={handleRegister}>
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
          <p>{errorMessage}</p>
        </form>
      </section>
    </div>
  );
};

export default UsersForm;
