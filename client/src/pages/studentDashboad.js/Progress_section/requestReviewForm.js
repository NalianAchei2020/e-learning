import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const RequestReviewForm = ({ selectedTask, onTaskSubmit }) => {
  //getting input request review form
  const [projectLink, setProjectLink] = useState('');
  const [confirmOriginalWork, setConfirmOriginalWork] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);
  //pull request link valindation
  const validateLinkFormat = (link) => {
    const linkRegex =
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/pull\/[0-9]+$/;
    return linkRegex.test(link);
  };
  const handleLinkChange = (e) => {
    setProjectLink(e.target.value);
    setIsLinkValid(validateLinkFormat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskSubmit(projectLink, selectedTask.taskIndex);
  };

  return (
    <div className="requestForm">
      <h2 className="mb-4">Program Activity Completion Form</h2>
      <h4 className="mb-5">Project Submission</h4>
      {selectedTask ? <p>{selectedTask.taskName}</p> : <p>No task selected</p>}
      <form onSubmit={handleSubmit}>
        <label>Activity Completed</label>
        {selectedTask ? (
          <input
            className="form-control"
            type="text"
            value={selectedTask.taskName}
          />
        ) : (
          ''
        )}
        <br />
        <label>
          <h5> Please submit the link to your project here</h5>
          <span>
            The Link should be in the format{' '}
            <b>https://github/username/repo/PR-name/number</b>
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          value={projectLink}
          onChange={handleLinkChange}
        />
        {isLinkValid ? null : (
          <p style={{ color: 'red' }}>Please enter a valid link.</p>
        )}
        <br />
        <input
          type="checkbox"
          required
          checked={confirmOriginalWork}
          onChange={(e) => setConfirmOriginalWork(e.target.checked)}
        />
        <label>
          <h5>
            I hereby confirm that this is my original work and in accordance
            with the <a href="#pagarism">plagiarism policy</a>.
          </h5>
          <span>
            Note: We have automated software that checks your work to make sure
            it is not copied from other developers, whether inside or outside of
            the school. We will take action on any work that our software deems
            plagiarized.
          </span>
        </label>
        <br />
        <br />
        <Button variant="primary" type="submit" disabled={!isLinkValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RequestReviewForm;
