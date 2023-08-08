import React, { useContext } from 'react';
import { StoreContext } from '../../Context/store';
import { removeCompletedTask } from '../../Context/reducer';
const CodeReviewer = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { completedTasks } = state;
  //approve code review
  const approved = (taskIndex) => {
    dispatch(removeCompletedTask(taskIndex));
    dispatch({ type: 'SUBMIT', payload: taskIndex });
    dispatch({ type: 'CLICKED', payload: true });
    window.location.reload();
  };
  //require changes for code review
  const requiredChanges = (taskIndex) => {
    dispatch(removeCompletedTask(taskIndex));
    dispatch({ type: 'REQUIRED_CHANGES', payload: taskIndex });
    dispatch({ type: 'CLICKED', payload: true });
    window.location.reload();
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="codeReview-progress">
        <span className="progress m-2"></span>
        <h5>25% Engagement</h5>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Pull Request Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.taskIndex}>
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
      <button onClick={handleRefresh}>Refresh</button>
    </>
  );
};

export default CodeReviewer;
