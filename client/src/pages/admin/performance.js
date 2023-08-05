import React, { useContext } from 'react';
import { StoreContext } from '../../Context/store';

const Performance = () => {
  const { state } = useContext(StoreContext);
  const { submitCompletedTasks } = state;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Pull Request Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submitCompletedTasks.map((task) => (
            <tr key={task.taskIndex}>
              <td>
                <a href={task.taskLink}>{task.taskName}</a>
              </td>
              <td>
                <a href={task.submitPullRequestLink}>
                  {task.submitPullRequestLink}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
