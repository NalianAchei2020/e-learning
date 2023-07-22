import React, { useState } from 'react';

const CodeReviewer = () => {
  // Define the initial state of the completed tasks array.
  const [completedTasks, setCompletedTasks] = useState([]);

  // Event handler for when a completed task is received from the student dashboard.
  const handleCompletedTask = (taskId, taskName, taskLink, pullRequestLink) => {
    // Add the completed task information to the completedTasks array.
    setCompletedTasks([
      ...completedTasks,
      { taskId, taskName, taskLink, pullRequestLink },
    ]);
  };

  // Render the table of completed tasks.
  return (
    <>
      <h2>Code Reviewer Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Link</th>
            <th>Pull Request Link</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>
                <a href={task.taskLink}>{task.taskLink}</a>
              </td>
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
