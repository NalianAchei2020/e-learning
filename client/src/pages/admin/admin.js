import React, { useEffect, useState } from 'react';
import Home from './home';
import UsersForm from './usersForm';
import PairStudents from './pairStudents';
import Performance from './performance';

const Admin = () => {
  //Routing links
  const [selectedLink, setSelectedLink] = useState(
    JSON.parse(localStorage.getItem('selectedLink')) || 'HomeAdmin'
  );
  // Define a function to handle clicks on navigation links
  function handleNavigation(section) {
    setSelectedLink(section);
  }
  //save to localStorage
  // links
  useEffect(() => {
    localStorage.setItem('selectedLink', JSON.stringify(selectedLink));
  }, [selectedLink]);
  return (
    <div className="main-container">
      <aside>
        <ul className="adminlist">
          <li>
            <a onClick={() => handleNavigation('HomeAdmin')} href="/admin">
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigation('adminusers')}
              href="/adminusers"
            >
              Users
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigation('pairstudent')}
              href="/pairstudent"
            >
              Pair Students
            </a>
          </li>
          <li>
            <a
              href="/performance"
              onClick={() => handleNavigation('performance')}
            >
              View Performance
            </a>
          </li>
        </ul>
      </aside>
      <main>
        <header>
          <ul className="nav">
            <li>
              <h5>Admin's Dashboard</h5>
            </li>
            <li>
              <a href="/" style={{ color: 'blue', textDecoration: 'none' }}>
                Signout
              </a>
            </li>
          </ul>
        </header>
        {selectedLink === 'HomeAdmin' && <Home />}
        {selectedLink === 'adminusers' && <UsersForm />}
        {selectedLink === 'pairstudent' && <PairStudents />}
        {selectedLink === 'performance' && <Performance />}
      </main>
    </div>
  );
};

export default Admin;
