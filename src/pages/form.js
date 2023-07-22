import { useState } from 'react';

function TaskForm({ selectedTask, onTaskSubmit }) {
  // Define the state variable for the pull request link input field.
  const [pullRequestLink, setPullRequestLink] = useState('');

  // Event handler for the "Submit" button on the "Finish Task" form, which calls the onTaskSubmit function with the pull request link as an argument.
  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskSubmit(pullRequestLink);
  };

  // Render the "Finish Task" form with a field for the pull request link.
  return (
    <form onSubmit={handleSubmit}>
      <h3>Finish Task: {selectedTask.taskName}</h3>
      <label htmlFor="pull-request-link">Pull Request Link:</label>
      <input
        id="pull-request-link"
        type="text"
        value={pullRequestLink}
        onChange={(e) => setPullRequestLink(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
export default TaskForm;
