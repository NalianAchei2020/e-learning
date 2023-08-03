import React, { useContext } from 'react';
import { StoreContext } from '../Context/store';

const Admin = () => {
  const { state } = useContext(StoreContext);
  const { submitCompletedTasks } = state;

  return (
    <div className="main-container">
      <aside>
        <ul>
          <li>
            <a href="/HomeAdmin">Home</a>
          </li>
          <li>
            <a href="/codeReviewerAdmin">Code Reviewers</a>
          </li>
          <li>
            <a href="/adminStudents">Students</a>
          </li>
        </ul>
      </aside>
      <main>
        <h4>ADMIN</h4>
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
      </main>
    </div>
  );
};

export default Admin;
