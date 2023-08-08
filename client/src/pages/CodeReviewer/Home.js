import React, { useEffect, useState } from 'react';
import CodeReviewer from './codeReviewer';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(
    JSON.parse(localStorage.getItem('selectedLink')) || 'CodeReviewerAdmin'
  );
  // Define a function to handle clicks on navigation links
  function handleNavigationTab(section) {
    setSelectedTab(section);
  }
  //save to localStorage
  // links
  useEffect(() => {
    localStorage.setItem('selectedLink', JSON.stringify(selectedTab));
  }, [selectedTab]);
  return (
    <div className="main-container">
      <aside>
        <ul className="adminlist">
          <li>
            <a
              onClick={() => handleNavigationTab('reviewerAdmin')}
              href="/revieweradmin"
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNavigationTab('ReviewCode')}
              href="/reviewcode"
            >
              Review Code
            </a>
          </li>
          <li>
            <a href="#assembly">Join Assembly</a>
          </li>
          <li>
            <a href="#referfriend">Refer a Friend</a>
          </li>
        </ul>
      </aside>
      <main>
        <header>
          <ul className="nav">
            <li>
              <h5>Code Reviewer's Dashboard</h5>
            </li>
          </ul>
        </header>
        <div className="codereviewer-screen">
          {selectedTab === 'ReviewCode' && <CodeReviewer />}
        </div>
      </main>
    </div>
  );
};

export default Home;
