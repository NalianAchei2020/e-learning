import React from 'react';
const CodeReviewer = ({ completedTasks }) => {
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
          {completedTasks.map((task, index) => (
            <tr key={index}>
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
