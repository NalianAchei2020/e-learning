import React from 'react';

const Home = () => {
  return (
    <div className="icon-container">
      <section className="container-icon home">
        <div className="image">
          <img src="Images/home.png" className="image-icon" alt="icon" />
        </div>
        <div className="text">
          <h3>Home</h3>
        </div>
      </section>
      <section className="container-icon users">
        <div className="image">
          <img src="Images/users.jpg" className="image-icon" alt="icon" />
        </div>
        <div className="text">
          <h3>Users</h3>
        </div>
      </section>
      <section className="container-icon pair">
        <div className="image">
          <img src="Images/pair.png" className="image-icon" alt="icon" />
        </div>
        <div className="text">
          <h3>Pair Students</h3>
        </div>
      </section>
      <section className="container-icon view">
        <div className="image">
          <img src="Images/view.png" className="image-icon" alt="icon" />
        </div>
        <div className="text">
          <h3>View Performance</h3>
        </div>
      </section>
    </div>
  );
};

export default Home;
