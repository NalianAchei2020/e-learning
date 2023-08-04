import React, { useEffect, useState } from 'react';
import Home from './home';

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
              onClick={() => handleNavigation('performance')}
              href="/performance"
            >
              View Performance
            </a>
          </li>
        </ul>
      </aside>
      <main>
        <header>
          <ul className="nav">
            <li>Admin</li>
          </ul>
        </header>
        {selectedLink === 'HomeAdmin' && <Home />}
        {selectedLink === 'adminusers' && <Home />}
        {selectedLink === 'pairstudent' && <Home />}
        {selectedLink === 'performance' && <Home />}
      </main>
    </div>
  );
};

export default Admin;
