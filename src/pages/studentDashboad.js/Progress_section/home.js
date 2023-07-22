import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { works } from './data';
const HomeProgress = () => {
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
  //active module
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  //review
  //active module function
  const handleModuleClick = (index) => {
    setActiveModuleIndex(index);
  };

  const handleRequestReview = () => {
    if (reviewsRequested < 5) {
      setShowReviewForm(true);
      setReviewsRequested(reviewsRequested + 1);
    } else {
      // display a message or disable the button
      console.log('error');
    }
  };
  //getting input request review form
  const [projectLink, setProjectLink] = useState('');
  const [confirmOriginalWork, setConfirmOriginalWork] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [taskLink, setTasLink] = useState('');
  //link valindation
  const validateLinkFormat = (link) => {
    const linkRegex =
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/pull\/[0-9]+$/;
    return linkRegex.test(link);
  };
  const handleLinkChange = (e) => {
    setProjectLink(e.target.value);
    setIsLinkValid(validateLinkFormat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task:', taskLink);
    console.log('Project Link:', projectLink);
    console.log('Confirm Original Work:', confirmOriginalWork);
  };

  const [clicked, setclicked] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState(null);
  return (
    <div>
      <section className="progress-section">
        <article className="message">
          <h4 className="m-3">Refer a Friend Now</h4>
          <p className="m-3">
            It’s great to hear you would recommend Microverse to a friend. Did
            you know that 1 out of every 3 micronauts first hears about
            Microverse from a friend or a family member?
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
                  <h6 className="title-bold">JAVASCRIPT AND NETWORKING</h6>
                  <span>
                    Week 1 - Dynamic websites and organizing JavaScript code
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
              className={`step ${index === activeModuleIndex ? 'active' : ''}`}
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
                                <a href={task.taskLink}>{task.taskName}</a>
                              </td>
                              <td>{task.type}</td>
                              <td>{task.time}</td>
                              <td>
                                <span
                                  id={task.taskIndex}
                                  className={`status ${
                                    task.type === 'Project'
                                      ? 'special-class'
                                      : status[task.taskIndex] === 'Completed'
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
        {/*popup for request review */}
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
                    Please make sure you have met all requirements as requested
                    to the best of your ability
                  </span>
                </div>
                <br />
                <form className="form-control" onSubmit={handleSubmit}>
                  <label>Activity Completed</label>
                  <a href={selectedTask.taskLink}>
                    <input
                      className="form-control"
                      type="text"
                      value={selectedTask.taskName}
                      onChange={(e) => {
                        setTasLink(e.target.value);
                      }}
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
                  <input
                    type="text"
                    className="form-control"
                    value={projectLink}
                    onChange={handleLinkChange}
                  />
                  {isLinkValid ? null : (
                    <p style={{ color: 'red' }}>Please enter a valid link.</p>
                  )}
                  <br />
                  <input
                    type="checkbox"
                    required
                    checked={confirmOriginalWork}
                    onChange={(e) => setConfirmOriginalWork(e.target.checked)}
                  />
                  <label>
                    <h5>
                      I hereby confirm that this is my original work and in
                      accordance with the{' '}
                      <a href="#pagarism">plagiarism policy</a>.
                    </h5>
                    <span>
                      Note: We have automated software that checks your work to
                      make sure it is not copied from other developers, whether
                      inside or outside of the school. We will take action on
                      any work that our software deems plagiarized.
                    </span>
                  </label>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isLinkValid}
                  >
                    Submit
                  </Button>
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
          </Modal.Footer>
        </Modal>
        <div>
          {selectedTask ? <p>{selectedTask.taskName}</p> : 'none'}
          <p>Project Link: {projectLink}</p>
          <p>Confirm Original Work: {confirmOriginalWork ? 'Yes' : 'No'}</p>
        </div>
      </section>
    </div>
  );
};

export default HomeProgress;
