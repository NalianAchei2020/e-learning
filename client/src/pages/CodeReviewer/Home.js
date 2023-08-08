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
              onClick={() => handleNavigationTab('CodeReviewerAdmin')}
              href="/reviewerdashboard"
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
              <h4>Code Reviewer's Dashboard</h4>
            </li>
          </ul>
        </header>
        <div className="codereviewer-screen">
          {selectedTab === 'CodeReviewerAdmin' && (
            <section className="icon-container">
              <section className="container-icon home">
                <a href="/codereviewer">
                  <div className="image">
                    <img
                      src="Images/home2.png"
                      className="image-icon"
                      alt="icon"
                    />
                  </div>
                  <div className="text">
                    <h3>Home</h3>
                  </div>
                </a>
              </section>
              <section className="container-icon home">
                <a href="/reviewcode">
                  <div className="image">
                    <img
                      src="Images/reviewcode.png"
                      className="image-icon"
                      alt="icon"
                    />
                  </div>
                  <div className="text">
                    <h3>Review Code</h3>
                  </div>
                </a>
              </section>
              <section className="container-icon home">
                <a href="#assembly">
                  <div className="image">
                    <img
                      src="Images/join.png"
                      className="image-icon"
                      alt="icon"
                    />
                  </div>
                  <div className="text">
                    <h3>Join Assembly</h3>
                  </div>
                </a>
              </section>
              <section className="container-icon home">
                <a href="#referfriend">
                  <div className="image">
                    <img
                      src="Images/refer.png"
                      className="image-icon"
                      alt="icon"
                    />
                  </div>
                  <div className="text">
                    <h3>Refer a Friend</h3>
                  </div>
                </a>
              </section>
            </section>
          )}
          {selectedTab === 'ReviewCode' && <CodeReviewer />}
        </div>
      </main>
    </div>
  );
};

export default Home;
