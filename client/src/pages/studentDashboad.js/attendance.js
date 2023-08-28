import React from 'react';

const Attendance = () => {
  return (
    <div>
      <section className="attendance-section">
        <article className=" message">
          <p className="mb-2">
            Here is your dedicated page to see your full attendance history and
            engagement history at Naltech!
          </p>
          <p className="mb-2">
            If you will be out for longer than a day and a half for local or
            religious holidays, doctor's appointments, illnesses, internet
            problems, etc. do let us know about it as soon as possible.
            <b>
              We expect you to let us, your partner and your Stand Up Team know
              about your absence well in advance, when possible, similar to any
              real-life work environment.
            </b>{' '}
          </p>
          <p className="mb-2">
            We use Zoom for systematically detecting absences. You can check
            here for a reminder about our{' '}
            <a href="#policy">Attendance Policy</a> at Naltech.
          </p>
          <p className="mb-2">
            If you see an absence on this page that you think is incorrect,
            please read this FAQ to troubleshoot what has happened and help you
            with next steps.
          </p>
        </article>
        <article class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <table className="table table-striped time-table">
                  <thead>
                    <tr>
                      <th className="t-head">Date</th>
                      <th className="t-head">Morning Meeting</th>
                      <th className="t-head">Collaboration</th>
                      <th className="t-head">Standup Meeting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Attendance;
