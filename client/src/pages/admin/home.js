import React from 'react';

const Home = () => {
  return (
    <div className="icon-container">
      <section className="container-icon home">
        <a href="/admin">
          <div className="image">
            <img src="Images/home.png" className="image-icon" alt="icon" />
          </div>
          <div className="text">
            <h3>Home</h3>
          </div>
        </a>
      </section>
      <section className="container-icon users">
        <a href="/adminusers">
          <div className="image">
            <img src="Images/users.jpg" className="image-icon" alt="icon" />
          </div>
          <div className="text">
            <h3>Users</h3>
          </div>
        </a>
      </section>
      <section className="container-icon pair">
        <a href="/pairstudent">
          <div className="image">
            <img src="Images/pair.png" className="image-icon" alt="icon" />
          </div>
          <div className="text">
            <h3>Pair Students</h3>
          </div>
        </a>
      </section>
      <section className="container-icon view">
        <a href="/performance">
          <div className="image">
            <img src="Images/view.png" className="image-icon" alt="icon" />
          </div>
          <div className="text">
            <h3>View Performance</h3>
          </div>
        </a>
      </section>
    </div>
  );
};

export default Home;
