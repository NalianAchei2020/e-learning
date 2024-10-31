import React, { useContext } from 'react';
import { StoreContext } from '../../Context/store';
import { removeCompletedTask } from '../../Context/reducer';
const CodeReviewer = () => {
  const { state, dispatch, updateTaskStatus } = useContext(StoreContext);
  const { completedTasks, codereviewerProgress } = state;
  //approve code review
  const approved = (taskIndex) => {
    dispatch(removeCompletedTask(taskIndex));
    dispatch({ type: 'INCREMENT' });
    updateTaskStatus(taskIndex, 'Submit');
    window.location.reload();
  };
  //require changes for code review
  const requiredChanges = (taskIndex) => {
    dispatch(removeCompletedTask(taskIndex));
    dispatch({ type: 'INCREMENT' });
    updateTaskStatus(taskIndex, 'Required Changes');
    window.location.reload();
  };
  return (
    <>
      <div className="codeReview-progress">
        <span className="progress m-2">
          <span
            className="progress-bar"
            role="progressbar"
            aria-valuenow={codereviewerProgress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: codereviewerProgress }}
          >
            {codereviewerProgress}%
          </span>
        </span>
        <h5>{codereviewerProgress}% Engagement</h5>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Task Name</th>
            <th>Pull Request Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.taskIndex}>
              <td>
                <a href={task.taskLink}>{task.studentName}</a>
              </td>
              <td>
                <a href={task.taskLink}>{task.taskName}</a>
              </td>
              <td>
                <a href={task.pullRequestLink}>{task.pullRequestLink}</a>
              </td>
              <td>
                <div className="btn-group">
                  <button
                    className="btn btn-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropDown-list feedback"
                        onClick={() => {
                          approved(task.taskIndex);
                        }}
                      >
                        Approve
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropDown-list feedback"
                        onClick={() => {
                          requiredChanges(task.taskIndex);
                        }}
                      >
                        Require Changes
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CodeReviewer;
