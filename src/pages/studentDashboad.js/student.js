/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import DashboardSection from './dashboard_section';
import Attendance from './attendance';
import HomeProgress from './Progress_section/home';
import RequestReviewForm from './Progress_section/requestReviewForm';

const Student = () => {
  //accessing tasks in a useState

  //Routing links
  const [selectedSection, setSelectedSection] = useState(
    JSON.parse(localStorage.getItem('selectedSection')) || 'dashboard-section'
  );
  // Define a function to handle clicks on navigation links
  function handleNavigationClick(section) {
    setSelectedSection(section);
  }
  //save to localStorage
  // links
  useEffect(() => {
    localStorage.setItem('selectedSection', JSON.stringify(selectedSection));
  }, [selectedSection]);
  //state of task status

  return (
    <div className="main-container">
      <aside>
        <section className="home">
          <h5>Home</h5>
          <ul className="list">
            <a
              href="/"
              onClick={() => handleNavigationClick('dashboard-section')}
            >
              <li>
                <i className="fa fa-home" aria-hidden="true"></i>
              </li>
              <li>Dashboard</li>
            </a>
          </ul>
        </section>
        <section className="lern">
          <h5>Learn</h5>
          <ul className="list">
            <a
              href="/progress-section-link"
              onClick={() => handleNavigationClick('progress-section')}
            >
              <li>
                <i className="fa fa-tasks" aria-hidden="true"></i>
              </li>
              <li>Progress</li>
            </a>
          </ul>
          <ul className="list">
            <a
              href="/attendance-section-link"
              onClick={() => handleNavigationClick('attendance-section')}
            >
              <li>
                <i className="fa fa-calendar" aria-hidden="true"></i>
              </li>
              <li>Attendance</li>
            </a>
          </ul>
          <ul className="list">
            <a
              href="/attendance-section-link"
              onClick={() => handleNavigationClick('attendance-section')}
            >
              <li>
                <i className="fa fa-calendar" aria-hidden="true"></i>
              </li>
              <li>Refer a friend</li>
            </a>
          </ul>
        </section>
      </aside>
      <main>
        <header>
          <ul className="nav">
            <li>Logo</li>
            <li>
              <a href="/codereviewer">Code Reviewer</a>
            </li>
            <li>
              <a href="/admin">Admin</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="#signout">Signout</a>
            </li>
          </ul>
        </header>

        <section className="all">
          {/*dashboard-section*/}
          {selectedSection === 'dashboard-section' && (
            <>
              <DashboardSection />
            </>
          )}

          {/*Progress section */}
          {selectedSection === 'progress-section' && <HomeProgress />}
          {/*Attendance section */}
          {selectedSection === 'attendance-section' && <Attendance />}
          {selectedSection === 'requestReviewForm' && <RequestReviewForm />}
        </section>
      </main>
    </div>
  );
};

export default Student;
