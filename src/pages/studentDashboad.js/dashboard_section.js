import React from 'react';

const DashboardSection = () => {
  return (
    <div>
      <section className="dashboard-section">
        <section className="message">
          <article>
            <h4 className="m-4">Hi StudentName, Welcome Back</h4>
          </article>
        </section>
        <section className="sec1 mb-5">
          <h6 className="title-stat">Program Stats</h6>
          <article className="stat d-flex flex-row justify-content-between bg-white p-10">
            <div>
              <ul className="d-flex flex-row justify-content-between gap-5">
                <li>
                  <h6 className="title-bold">Program Progress</h6>
                  JavaScript and Networking
                </li>
                <li className="mt-4">9 modules remaining</li>
              </ul>
              <div className="progress">
                <span className="progress-bar"></span>
              </div>
            </div>
            <div className="repeated-module">
              <ul className="d-flex flex-column gap-3">
                <li className="title-bold">Module Repeats</li>
                <li>0/2</li>
                <li>Repeated</li>
              </ul>
            </div>
            <div className="repeated-block">
              <ul className="d-flex flex-column gap-3">
                <li className="title-bold">Block Repeats</li>
                <li>0/2</li>
                <li>Repeated</li>
              </ul>
            </div>
          </article>
        </section>
        {/*Join call*/}
        <section className="d-flex flex-row justify-content-between">
          <div className="container">
            <h5 className="title-meeting">Daily Meeting</h5>
            <table className="table table-striped time-table">
              <thead>
                <tr>
                  <th className="t-head">Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8:00 - 8:30</td>
                  <td>Morning Meeting</td>
                  <td>
                    <button className="btn btn-success">Join Meeting</button>
                  </td>
                </tr>
                <tr>
                  <td>8:00 - 8:30</td>
                  <td>program Time</td>
                  <td>
                    <button className="btn btn-success">Join Meeting</button>
                  </td>
                </tr>
                <tr>
                  <td>8:00 - 8:30</td>
                  <td>Standup Meeting</td>
                  <td>
                    <button className="btn btn-success">Join Meeting</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container">
            <h5 className="title-meeting">Collaboration Info</h5>
            <table className="table table-striped time-table">
              <thead>
                <tr>
                  <th className="t-head">This block's collaboration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Morning session Team</td>
                  <td>
                    <ul>
                      <li className="mb-2">
                        <a href="#rose">Rose</a>
                      </li>
                      <li className="mb-2">
                        <a href="#mac">MAc</a>
                      </li>
                      <li className="mb-2">
                        <a href="#rose">Belinda</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>Standup Team</td>
                  <td>
                    <ul>
                      <li className="mb-2">
                        <a href="#rose">Rose</a>
                      </li>
                      <li className="mb-2">
                        <a href="#mac">MAc</a>
                      </li>
                      <li className="mb-2">
                        <a href="#rose">Belinda</a>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td> Collaborative Team</td>
                  <td>
                    <ul>
                      <li className="mb-2">
                        <a href="#rose">Rose</a>
                      </li>
                      <li className="mb-2">
                        <a href="#mac">MAc</a>
                      </li>
                      <li className="mb-2">
                        <a href="#rose">Belinda</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DashboardSection;
