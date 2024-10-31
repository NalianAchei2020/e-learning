import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
const SubmitForm = ({ selectedTask, onProjectSubmit }) => {
  const [submitprojectLink, setsubmitProjectLink] = useState('');
  const [confirmOriginalWork, setConfirmOriginalWork] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(false);

  console.log(submitprojectLink + 'hello');
  //pull request link valindation
  const validateLinkFormat = (link) => {
    const linkRegex =
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/pull\/[0-9]+$/;
    return linkRegex.test(link);
  };
  const handledLinkChange = (e) => {
    setsubmitProjectLink(e.target.value);
    setIsLinkValid(validateLinkFormat(e.target.value));
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    onProjectSubmit(submitprojectLink, selectedTask.taskIndex);
  };
  return (
    <div className="requestForm submitform">
      <h2 className="mb-4">Program Activity Completion Form</h2>
      <h4 className="mb-5">Project Submission</h4>
      <section>
        <span>
          You've finished another exercise - Awesome! Please submit the below to
          continue with the next steps.
        </span>
        <div>
          <form onSubmit={handleProjectSubmit}>
            <label>Which activity did you just complete?</label>
            {selectedTask ? (
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
              >
                <option selected>{selectedTask.taskName}</option>
                <option>{selectedTask.taskIndex}</option>
              </select>
            ) : (
              <p>No task found</p>
            )}
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
              value={submitprojectLink}
              onChange={handledLinkChange}
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
                Note: We have automated software that checks your work to make
                sure it is not copied from other developers, whether inside or
                outside of the school. We will take action on any work that our
                software deems plagiarized.
              </span>
            </label>
            <br />
            <br />
            <Button variant="primary" type="submit" disabled={!isLinkValid}>
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SubmitForm;
