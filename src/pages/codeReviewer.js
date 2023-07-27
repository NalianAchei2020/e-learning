import React, { useContext } from 'react';
import AppContext from '../Context/appContext';
const CodeReviewer = () => {
  const { completedTasks } = useContext(AppContext);
  console.log(completedTasks);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Pull Request Link</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.taskIndex}>
              <td>{task.taskIndex}</td>
              <td>{task.taskName}</td>
              <td>
                <a href={task.pullRequestLink}>{task.pullRequestLink}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CodeReviewer;
