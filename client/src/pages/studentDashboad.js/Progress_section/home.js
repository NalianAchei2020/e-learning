/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestReviewForm from './requestReviewForm';
import { addCompletedTaskWithLink } from '../../../Context/reducer';
import { submitCompletedTasks } from '../../../Context/reducer';
import { StoreContext } from '../../../Context/store';
import SubmitForm from './submitForm';
const HomeProgress = () => {
  const { state, dispatch, updateTaskStatus, progress, completedT, total } =
    useContext(StoreContext);
  const { loginName, works } = state;
  //remove code from loginName
  const string = loginName || '';
  const result = string.replace(/"/g, '');
  //get state
  const { mainPage, requestReviewForm, submitProjectForm } = state;

  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const allTasks = works.flatMap((module) =>
      module.blocks.flatMap((block) => block.days.flatMap((day) => day.tasks))
    );
    setTasks(allTasks);
  }, []);

  //active module
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  //review
  //active module function
  const handleModuleClick = (index) => {
    setActiveModuleIndex(index);
  };

  //form section
  const navigate = useNavigate();

  //click to request review form
  const request = (taskId) => {
    setSelectedTask(tasks.find((task) => task.taskIndex === taskId));
    dispatch({ type: 'MAINPAGE', payload: false });
    dispatch({ type: 'SUBMITPROJECT', payload: false });
    dispatch({ type: 'REQUESTFORM', payload: true });
    navigate('#form');
  };
  //click to submit approved project form
  const submitProject = (taskId) => {
    setSelectedTask(tasks.find((task) => task.taskIndex === taskId));
    dispatch({ type: 'MAINPAGE', payload: false });
    dispatch({ type: 'REQUESTFORM', payload: false });
    dispatch({ type: 'SUBMITPROJECT', payload: true });
  };

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
        pullRequestLink,
        result
      )
    );
    updateTaskStatus(index, 'Pending');

    dispatch({ type: 'MAINPAGE', payload: true });
    dispatch({ type: 'REQUESTFORM', payload: false });
  };
  //function to submit approved to admin
  const handleSubmitProject = (submitPullRequestLink, index) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === selectedTask.taskId
        ? { ...task, submitPullRequestLink }
        : task
    );
    setRequestReview(updatedTasks);
    dispatch(
      submitCompletedTasks(
        selectedTask.taskIndex,
        selectedTask.taskName,
        selectedTask.taskLink,
        submitPullRequestLink
      )
    );
    updateTaskStatus(index, 'Completed');

    dispatch({ type: 'MAINPAGE', payload: true });
    dispatch({ type: 'SUBMITPROJECT', payload: false });
  };
  // submit lessons
  const Submit = (taskIndex) => {
    updateTaskStatus(taskIndex, 'Completed');
    window.location.reload();
  };

  //track progress

  return (
    <div>
      {mainPage && (
        <section className="progress-section">
          <h4>{result} progress</h4>
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
                <span className="progress">
                  <span
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress }}
                  >
                    {progress}%
                  </span>
                </span>
                <br />
                <br />
                <p style={{ color: 'blue' }}>{progress}%</p>
              </div>
              <div className="repeated-module">
                <ul className="d-flex flex-column gap-2">
                  <li className="title-bold">Core requirements</li>
                  <li>(For this block)</li>
                  <li>
                    {completedT}/{total}
                  </li>
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
                                        : task.status === 'Completed'
                                        ? 'complete'
                                        : ''
                                    }`}
                                  >
                                    {task.status}
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
                                              Submit(task.taskIndex);
                                            }
                                            if (task.type === 'Project') {
                                              request(task.taskIndex);
                                            }
                                            if (
                                              task.type === 'Project' &&
                                              task.status === 'Submit'
                                            ) {
                                              submitProject(task.taskIndex);
                                            }
                                          }}
                                          className="dropDown-list"
                                        >
                                          {task.type === 'Exercise'
                                            ? 'Submit'
                                            : task.type === 'Project' &&
                                              task.status === 'Request Review'
                                            ? 'Request Review'
                                            : task.type === 'Project' &&
                                              task.status === 'Required Changes'
                                            ? 'Request Review'
                                            : task.status === 'Completed'
                                            ? 'Undo Submission'
                                            : task.status === 'Pending' &&
                                              task.type === 'Project'
                                            ? 'View Submssion'
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

      {requestReviewForm && (
        <section>
          <RequestReviewForm
            id="form"
            selectedTask={selectedTask}
            onTaskSubmit={handleTaskSubmit}
            RequestReviewTask={RequestReviewTask}
          />
        </section>
      )}
      {submitProjectForm && (
        <section>
          <SubmitForm
            selectedTask={selectedTask}
            onProjectSubmit={handleSubmitProject}
          />
        </section>
      )}
    </div>
  );
};

export default HomeProgress;
