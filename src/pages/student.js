/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { works } from '../data';

const Student = () => {
  //active module
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  //review

  //accessing tasks in a useState
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const allTasks = works.flatMap((module) =>
      module.blocks.flatMap((block) => block.days.flatMap((day) => day.tasks))
    );
    setTasks(allTasks);
  }, []);

  //popUp screen
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  //maximum num of review
  const [reviewsRequested, setReviewsRequested] = useState(0);
  //message
  const [message, setMessage] = useState('');
  //popup for request review
  const handlepopUp = (taskId) => {
    if (reviewsRequested < 5) {
      setSelectedTask(tasks.find((task) => task.taskIndex === taskId));
      setShowModal(true);
      setReviewsRequested(reviewsRequested + 1);
      setMessage(reviewsRequested);
    } else {
      setMessage('You Have Reached Your Request Review Limit');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  //status
  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem('status')) || ''
  );
  const [statusRe, setStatusRe] = useState('');
  useEffect(() => {
    const totalTasks = works.reduce(
      (sum, module) =>
        sum +
        module.blocks.reduce(
          (sum, block) =>
            sum + block.days.reduce((sum, day) => sum + day.tasks.length, 0),
          0
        ),
      0
    );
    const initialStatus = new Array(totalTasks).fill('Not Started');
    setStatus(initialStatus);
  }, []);

  const [clicked, setclicked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState(null);

  //Routing links
  const [selectedSection, setSelectedSection] = useState(
    JSON.parse(localStorage.getItem('selectedSection')) || 'dashboard-section'
  );

  //save to localStorage
  // links
  useEffect(() => {
    localStorage.setItem('selectedSection', JSON.stringify(selectedSection));
  }, [selectedSection]);
  //state of task status
  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
  }, [status]);

  const submit = (index) => {
    setStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = 'Completed';
      return newStatus;
    });
    setclicked(true);
    console.log(index);
    console.log(status);
  };

  const submitRe = (index) => {
    setStatusRe((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = 'Pending';
      return newStatus;
    });
    setclicked(true);
    console.log(index);
    console.log(statusRe);
  };

  //active module function
  const handleModuleClick = (index) => {
    setActiveModuleIndex(index);
  };

  // Define a function to handle clicks on navigation links
  function handleNavigationClick(section) {
    setSelectedSection(section);
  }

  const handleRequestReview = () => {
    if (reviewsRequested < 5) {
      setShowReviewForm(true);
      setReviewsRequested(reviewsRequested + 1);
    } else {
      // display a message or disable the button
      console.log('error');
    }
  };

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
              <a href="#signout">Signout</a>
            </li>
          </ul>
        </header>

        <section className="all">
          {/*dashboard-section*/}
          {selectedSection === 'dashboard-section' && (
            <>
              <section className="dashboard-section">
                <section className="message">
                  <article>
                    <h4 className="m-4">Hi StudentName, Welcome Back</h4>
                  </article>
                </section>
                <section className="sec1 mb-5">
                  <h6 className="title-stat">Program Stats</h6>
                  <article className="stat d-flex flex-row justify-content-between bg-white p-10">
                    <div>
                      <ul className="d-flex flex-row justify-content-between gap-5">
                        <li>
                          <h6 className="title-bold">Program Progress</h6>
                          JavaScript and Networking
                        </li>
                        <li className="mt-4">9 modules remaining</li>
                      </ul>
                      <div className="progress">
                        <span className="progress-bar"></span>
                      </div>
                    </div>
                    <div className="repeated-module">
                      <ul className="d-flex flex-column gap-3">
                        <li className="title-bold">Module Repeats</li>
                        <li>0/2</li>
                        <li>Repeated</li>
                      </ul>
                    </div>
                    <div className="repeated-block">
                      <ul className="d-flex flex-column gap-3">
                        <li className="title-bold">Block Repeats</li>
                        <li>0/2</li>
                        <li>Repeated</li>
                      </ul>
                    </div>
                  </article>
                </section>
                {/*Join call*/}
                <section className="d-flex flex-row justify-content-between">
                  <div className="container">
                    <h5 className="title-meeting">Daily Meeting</h5>
                    <table className="table table-striped time-table">
                      <thead>
                        <tr>
                          <th className="t-head">Day</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>8:00 - 8:30</td>
                          <td>Morning Meeting</td>
                          <td>
                            <button className="btn btn-success">
                              Join Meeting
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>8:00 - 8:30</td>
                          <td>program Time</td>
                          <td>
                            <button className="btn btn-success">
                              Join Meeting
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>8:00 - 8:30</td>
                          <td>Standup Meeting</td>
                          <td>
                            <button className="btn btn-success">
                              Join Meeting
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="container">
                    <h5 className="title-meeting">Collaboration Info</h5>
                    <table className="table table-striped time-table">
                      <thead>
                        <tr>
                          <th className="t-head">This block's collaboration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Morning session Team</td>
                          <td>
                            <ul>
                              <li className="mb-2">
                                <a href="#rose">Rose</a>
                              </li>
                              <li className="mb-2">
                                <a href="#mac">MAc</a>
                              </li>
                              <li className="mb-2">
                                <a href="#rose">Belinda</a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td>Standup Team</td>
                          <td>
                            <ul>
                              <li className="mb-2">
                                <a href="#rose">Rose</a>
                              </li>
                              <li className="mb-2">
                                <a href="#mac">MAc</a>
                              </li>
                              <li className="mb-2">
                                <a href="#rose">Belinda</a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td> Collaborative Team</td>
                          <td>
                            <ul>
                              <li className="mb-2">
                                <a href="#rose">Rose</a>
                              </li>
                              <li className="mb-2">
                                <a href="#mac">MAc</a>
                              </li>
                              <li className="mb-2">
                                <a href="#rose">Belinda</a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </section>
              <hr />
            </>
          )}

          {/*Progress section */}
          {selectedSection === 'progress-section' && (
            <section className="progress-section">
              <article className="message">
                <h4 className="m-3">Refer a Friend Now</h4>
                <p className="m-3">
                  It’s great to hear you would recommend Microverse to a friend.
                  Did you know that 1 out of every 3 micronauts first hears
                  about Microverse from a friend or a family member?
                </p>
                <p className="m-3">
                  Change a friends life today and earn $100 when they become a
                  Micronaut if they are an eligible referral.
                </p>
                <p className="m-3">
                  It will take only a few seconds with the new 1-click feature
                </p>
                <button className="btn btn-success m-2">Refer Now</button>
              </article>
              <h4>StudentName progress</h4>
              <section>
                <article className="stat-progress d-flex flex-row justify-content-between bg-white">
                  <div>
                    <ul className="d-flex flex-column">
                      <li>
                        <h6 className="title-bold">
                          JAVASCRIPT AND NETWORKING
                        </h6>
                        <span>
                          Week 1 - Dynamic websites and organizing JavaScript
                          code
                        </span>
                      </li>
                    </ul>
                    <span className="progress"></span>
                  </div>
                  <div className="repeated-module">
                    <ul className="d-flex flex-column gap-2">
                      <li className="title-bold">Core requirements</li>
                      <li>(For this block)</li>
                      <li>14 / 28</li>
                      <li>Completed</li>
                    </ul>
                  </div>
                  <div className="repeated-block">
                    <ul className="d-flex flex-column gap-2">
                      <li className="title-bold">Carry Overs</li>
                      <li>(From last week)</li>
                      <li>0 / 0</li>
                      <li>Completed</li>
                    </ul>
                  </div>
                </article>
              </section>
              {/*accordion*/}
              <div className="multi-step">
                {works.map((module, index) => (
                  <div
                    key={index}
                    className={`step ${
                      index === activeModuleIndex ? 'active' : ''
                    }`}
                    onClick={() => handleModuleClick(index)}
                  >
                    {module.moduleName}
                  </div>
                ))}
              </div>
              {works[activeModuleIndex].blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="accordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#block-${blockIndex}`}
                      >
                        {block.blockName}
                      </button>
                    </h2>
                    <div
                      id={`block-${blockIndex}`}
                      className="accordion-collapse collapse show"
                      data-bs-parent=".accordion"
                    >
                      <div className="accordion-body">
                        {block.days.map((day, dayIndex) => (
                          <div key={dayIndex} className="day">
                            <h3 className="daytime">{day.date}</h3>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Task Name</th>
                                  <th>Type</th>
                                  <th>Time</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {day.tasks.map((task, taskIndex) => (
                                  <tr key={taskIndex}>
                                    <td>
                                      <a href={task.taskLink}>
                                        {task.taskName}
                                      </a>
                                    </td>
                                    <td>{task.type}</td>
                                    <td>{task.time}</td>
                                    <td>
                                      <span
                                        id={task.taskIndex}
                                        className={`status ${
                                          task.type === 'Project'
                                            ? 'special-class'
                                            : status[task.taskIndex] ===
                                              'Completed'
                                            ? 'complete'
                                            : ''
                                        }`}
                                      >
                                        {clicked &&
                                        status[task.taskIndex] !== undefined &&
                                        task.type === 'Lesson'
                                          ? `${status[task.taskIndex]}`
                                          : `${task.status}`}
                                      </span>
                                    </td>
                                    <td>
                                      <div class="btn-group">
                                        <button
                                          class="btn btn-secondary btn-sm dropdown-toggle"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          Actions
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li>
                                            <a
                                              href={task.taskLink}
                                              className="dropDown-list"
                                            >
                                              View Activity
                                            </a>
                                          </li>
                                          <li>
                                            <button
                                              type="submit"
                                              id={task.taskIndex}
                                              onClick={() => {
                                                if (task.type === 'Lesson') {
                                                  submit(task.taskIndex);
                                                }
                                                if (task.type === 'Project') {
                                                  handlepopUp(task.taskIndex);
                                                }
                                              }}
                                              className="dropDown-list"
                                            >
                                              {task.type === 'Exercise'
                                                ? 'Submit'
                                                : task.type === 'Project'
                                                ? 'Request Review'
                                                : 'submit'}
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h1>Request a Review</h1>
                    {selectedTask ? (
                      <p>Project:{selectedTask.taskName}</p>
                    ) : (
                      <p>Task not found</p>
                    )}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedTask ? (
                    <div>
                      <div>
                        <span>
                          You have {message} of 5 reviews left for this activity
                        </span>
                      </div>
                      <br />
                      <div>
                        <span>
                          Please make sure you have met all requirements as
                          requested to the best of your ability
                        </span>
                      </div>
                      <br />
                      <form className="form-control">
                        <label>Activity Completed</label>
                        <a href={selectedTask.taskLink}>
                          <input
                            className="form-control"
                            type="text"
                            value={selectedTask.taskName}
                          />
                          <br />
                        </a>
                        <label>
                          <h5> Please submit the link to your project here</h5>
                          <span>
                            The Link should be in the format{' '}
                            <b>https://github/username/repo/PR-name/number</b>
                          </span>
                        </label>
                        <input type="text" className="form-control" />
                        <br />
                        <input type="checkbox" />
                        <label>
                          <h5>
                            I hereby confirm that this is my original work and
                            in accordance with the{' '}
                            <a href="#pagarism">plagiarism policy</a>.
                          </h5>
                          <span>
                            Note: We have automated software that checks your
                            work to make sure it is not copied from other
                            developers, whether inside or outside of the school.
                            We will take action on any work that our software
                            deems plagiarized.
                          </span>
                        </label>
                      </form>
                    </div>
                  ) : (
                    <p>No task selected</p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => submit(selectedTask.taskIndex)}
                  >
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </section>
          )}
          {/*Attendance section */}
          {selectedSection === 'attendance-section' && (
            <section className="attendance-section">
              <article className=" message">
                <p className="mb-2">
                  Here is your dedicated page to see your full attendance
                  history and engagement history at Microverse!
                </p>
                <p className="mb-2">
                  If you will be out for longer than a day and a half for local
                  or religious holidays, doctor's appointments, illnesses,
                  internet problems, etc. do let us know about it as soon as
                  possible.
                  <b>
                    We expect you to let us, your partner and your Stand Up Team
                    know about your absence well in advance, when possible,
                    similar to any real-life work environment.
                  </b>{' '}
                </p>
                <p className="mb-2">
                  We use Zoom for systematically detecting absences. You can
                  check here for a reminder about our{' '}
                  <a href="#policy">Attendance Policy</a> at Microverse.
                </p>
                <p className="mb-2">
                  If you see an absence on this page that you think is
                  incorrect, please read this FAQ to troubleshoot what has
                  happened and help you with next steps.
                </p>
              </article>
              <article class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    ></button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <table className="table table-striped time-table">
                        <thead>
                          <tr>
                            <th className="t-head">Date</th>
                            <th className="t-head">Morning Meeting</th>
                            <th className="t-head">Collaboration</th>
                            <th className="t-head">Standup Meeting</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default Student;
