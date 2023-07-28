/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { works } from './data';
import { useNavigate } from 'react-router-dom';
import RequestReviewForm from './requestReviewForm';
import { addCompletedTaskWithLink } from '../../../Context/reducer';
import { StoreContext } from '../../../Context/store';
const HomeProgress = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { statusOne, statusTwo, CLICKED } = state;

  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const allTasks = works.flatMap((module) =>
      module.blocks.flatMap((block) => block.days.flatMap((day) => day.tasks))
    );
    setTasks(allTasks);
  }, []);

  //status

  useEffect(() => {
    localStorage.setItem('statusOne', JSON.stringify(statusOne));
  }, [statusOne]);

  const [clicktwo, setclicktwo] = useState(false);

  useEffect(() => {
    // Retrieve the status state from localStorage
    const storedStatus = localStorage.getItem('statusOne');
    if (storedStatus) {
      JSON.parse(storedStatus);
    } else {
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
      dispatch({ type: 'INIT', payload: initialStatus });
    }
  }, [works]);
  //change the state of request review
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
    const initialStatus = new Array(totalTasks).fill('Request Review');
    dispatch({ type: 'INITIAL', payload: initialStatus });
  }, [works]);

  const submit = (index) => {
    dispatch({ type: 'COMPLETE', payload: index });
    setclicked(true);
  };
  //active module
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  //review
  //active module function
  const handleModuleClick = (index) => {
    setActiveModuleIndex(index);
  };

  const [clicked, setclicked] = useState(
    localStorage.getItem('clicked')
      ? JSON.parse(localStorage.getItem('clicked'))
      : false
  );
  useEffect(() => {
    localStorage.setItem('clicked', JSON.stringify(clicked));
  }, [clicked]);
  //form section
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [pathToNavigate, setPathToNavigate] = useState(
    JSON.parse(localStorage.getItem('pathToNavigate')) || ''
  );
  const request = (taskId) => {
    setSelectedTask(tasks.find((task) => task.taskIndex === taskId));
    setShowButton(false);
    setShowForm(true);
    setPathToNavigate('#form');
  };
  useEffect(() => {
    if (pathToNavigate) {
      navigate(pathToNavigate);
      localStorage.removeItem('pathToNavigate');
    }
  }, [navigate, pathToNavigate]);

  //get inputs
  //Requesting a review from a code reviewer
  const [RequestReviewTask, setRequestReview] = useState([]);

  const handleTaskSubmit = (pullRequestLink, index) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === selectedTask.taskId ? { ...task, pullRequestLink } : task
    );
    setRequestReview(updatedTasks);
    // Send the completed task information to the code reviewer dashboard
    dispatch(
      addCompletedTaskWithLink(
        selectedTask.taskIndex,
        selectedTask.taskName,
        selectedTask.taskLink,
        pullRequestLink
      )
    );
    dispatch({ type: 'PENDING', payload: index });
    dispatch({ type: 'CLICKED', payload: true });

    setShowButton(true);
    setShowForm(false);
  };
  return (
    <div>
      {showButton && (
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
                                        : statusOne[task.taskIndex] ===
                                          'Completed'
                                        ? 'complete'
                                        : ''
                                    }`}
                                  >
                                    {clicked && task.type === 'Lesson'
                                      ? `${statusOne[task.taskIndex]}`
                                      : CLICKED && task.type === 'Project'
                                      ? `${statusTwo[task.taskIndex]}`
                                      : `${task.status}`}
                                  </span>
                                </td>
                                <td>
                                  <div className="btn-group">
                                    <button
                                      class="btn btn-secondary btn-sm dropdown-toggle"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Actions
                                    </button>
                                    <ul className="dropdown-menu">
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
                                              request(task.taskIndex);
                                            }
                                          }}
                                          className="dropDown-list"
                                        >
                                          {task.type === 'Exercise'
                                            ? 'Submit'
                                            : task.type === 'Project'
                                            ? 'Request Review'
                                            : clicked &&
                                              statusOne[task.taskIndex] ===
                                                'Completed'
                                            ? 'Undo Submission'
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
        </section>
      )}

      {showForm && (
        <section>
          <RequestReviewForm
            id="form"
            selectedTask={selectedTask}
            onTaskSubmit={handleTaskSubmit}
            RequestReviewTask={RequestReviewTask}
          />
        </section>
      )}
    </div>
  );
};

export default HomeProgress;
