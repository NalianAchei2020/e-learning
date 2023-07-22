import { useState } from 'react';
import TaskForm from './form';

function StudentDashboard() {
  // Define the initial state of the tasks array, with taskId, taskName, taskLink, and taskStatus properties.
  const [tasks, setTasks] = useState([
    {
      taskId: 1,
      taskName: 'Task 1',
      taskLink: 'https://github.com/user/repo/issues/1',
      taskStatus: 'in progress',
    },
    {
      taskId: 2,
      taskName: 'Task 2',
      taskLink: 'https://github.com/user/repo/issues/2',
      taskStatus: 'in progress',
    },
    {
      taskId: 3,
      taskName: 'Task 3',
      taskLink: 'https://github.com/user/repo/issues/3',
      taskStatus: 'in progress',
    },
  ]);

  // Define the state variable for the selected task, which will be used to display the "Finish Task" form.
  const [selectedTask, setSelectedTask] = useState(null);

  // Event handler for the "Finish" button, which sets the selected task to be the task that was clicked.
  const handleFinishTask = (task) => {
    setSelectedTask(task);
  };

  // Event handler for the "Submit" button on the "Finish Task" form, which updates the tasks array with the completed task and pull request link.
  const handleTaskSubmit = (pullRequestLink) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === selectedTask.taskId
        ? { ...task, taskStatus: 'completed', pullRequestLink }
        : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
    // Send the completed task information to the code reviewer dashboard
    sendCompletedTaskToCodeReviewer(
      selectedTask.taskId,
      selectedTask.taskName,
      selectedTask.taskLink,
      pullRequestLink
    );
  };

  // Function to send the completed task information to the code reviewer dashboard
  const sendCompletedTaskToCodeReviewer = (
    taskId,
    taskName,
    taskLink,
    pullRequestLink
  ) => {
    // Here you can implement the logic to send the completed task information to the code reviewer dashboard.
    console.log(
      `Task ${taskId} completed with pull request link: ${pullRequestLink}`
    );
  };

  // Render the table of tasks, with a button to "Finish" each in-progress task.
  return (
    <>
      <h2>Student Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Link</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>
                <a href={task.taskLink}>{task.taskLink}</a>
              </td>
              <td>{task.taskStatus}</td>
              <td>
                {task.taskStatus === 'in progress' && (
                  <button onClick={() => handleFinishTask(task)}>Finish</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the "Finish Task" form if a task is selected */}
      {selectedTask && (
        <TaskForm selectedTask={selectedTask} onTaskSubmit={handleTaskSubmit} />
      )}
    </>
  );
}

export default StudentDashboard;
