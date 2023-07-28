import React from 'react';
import { Button } from 'react-bootstrap';
const SubmitForm = () => {
  return (
    <div>
      <h1>Program Activity Completion Form</h1>
      <h4>Project Submission</h4>
      <section>
        <span>
          You've finished another exercise - Awesome! Please submit the below to
          continue with the next steps.
        </span>
        <div>
          <form>
            <label>Which activity did you just complete?</label>
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option selected>Open this select menu</option>
            </select>
            <label>
              <h5> Please submit the link to your project here</h5>
              <span>
                The Link should be in the format{' '}
                <b>https://github/username/repo/PR-name/number</b>
              </span>
            </label>
            <input type="text" className="form-control" />
            <br />
            <input type="checkbox" required />
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SubmitForm;
