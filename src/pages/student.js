import React, { useState } from 'react';
import {works} from '../data'

const Student = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    return (
        <div className='main-container'>
            <aside>
               <section className='home'>
                <h5>Home</h5>
                <ul className='list'>
                 <a href=''>
                <li><i class="fa fa-home" aria-hidden="true"></i></li>
                <li>Dashboard</li>
                </a>
                </ul>
                </section>
                <section className='lern'>
                    <h5>Learn</h5>
                <ul className='list'>
                 <a href=''>
                <li><i class="fa fa-tasks" aria-hidden="true"></i></li>
                <li>Progress</li>
                </a>
                </ul>
                <ul>
                 <a href=''>
                <li><i class="fa fa-calendar" aria-hidden="true"></i></li>
                <li>Attendance</li>
                </a>
                </ul>
                </section>
            </aside>

            <main>
                <header>
                    <ul className='nav' >
                        <li>Logo</li>
                        <li><a href=''>Signout</a></li>
                    </ul>
                </header>

                {/*dashboard-section*/}
                <section className='dashboard-section'>
                    <section className='message'></section>
                    <section  className='sec1'>
                        <h6>Program Stats</h6>
                        <article className='stat d-flex flex-row'>
                            <div>
                            <ul className='d-flex flex-row'>
                              <li><h6>Program Progress</h6>
                                JavaScript and Networking</li>
                                <li className='mt-4'>9 modules remaining</li>
                            </ul>
                            <span className='progress'></span>
                            </div>
                            <div className='repeated-module'>
                                <ul className='d-flex flex-column gap-4'>
                                    <li>Module Repeats</li>
                                    <li>0/2</li>
                                    <li>Repeated</li>
                                </ul>
                            </div>
                            <div className='repeated-block'>
                                <ul className='d-flex flex-column gap-4'>
                                    <li>Block Repeats</li>
                                    <li>0/2</li>
                                    <li>Repeated</li>
                                </ul>
                            </div>
                        </article>
                    </section>
              {/*Join call*/}
              <section className='d-flex flex-row'>
                <div className='container'>
                    <h5>Daily Meeting</h5>
                    <table className='table table-striped time-table'>
                        <thead>
                          <tr>
                          <th>Day</th>  
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>8:00 - 8:30</td>
                            <td>Morning Meeting</td>
                        </tr>
                        <tr>
                            <td>8:00 - 8:30</td>
                            <td>program Time</td>
                        </tr>
                        <tr>
                            <td>8:00 - 8:30</td>
                            <td>Standup Meeting</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className='container'>
                    <h5>This block's collaboration	</h5>
                    <table className='table table-striped time-table'>
                        <thead>
                          <tr>
                          <th>This block's collaboration</th>  
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Morning session Team</td>
                            <td>
                                <ul>
                                    <li className='mb-4'><a href='#rose'>Rose</a></li>
                                    <li className='mb-4'><a href='#mac'>MAc</a></li>
                                    <li className='mb-4'><a href='#rose'>Belinda</a></li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Standup Team</td>
                            <td>
                            <ul>
                            <li className='mb-4'><a href='#rose'>Rose</a></li>
                            <li className='mb-4'><a href='#mac'>MAc</a></li>
                            <li className='mb-4'><a href='#rose'>Belinda</a></li>
                            </ul>
                            </td>
                        </tr>
                        <tr>
                            <td> Collaborative Team</td>
                            <td>
                            <ul>
                            <li className='mb-4'><a href='#rose'>Rose</a></li>
                            <li className='mb-4'><a href='#mac'>MAc</a></li>
                            <li className='mb-4'><a href='#rose'>Belinda</a></li>
                            </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
              </section>
                </section><hr/>

                {/*Progress section */}
                <section className='progress-section'>
                    <h1>StudentName progress</h1>
                <section>
                <article className='stat d-flex flex-row'>
                 <div>
                <ul className='d-flex flex-column'>
                <li><h6>JAVASCRIPT AND NETWORKING</h6>
              <span>Week 1 - Dynamic websites and organizing JavaScript code</span></li>
                     </ul>
                 <span className='progress'></span>
                 </div>
                <div className='repeated-module'>
                 <ul className='d-flex flex-column gap-4'>
                <li>Core requirements</li>
                <li>(For this block)</li>
                <li>14 / 28</li>
                <li>Completed</li>
                 </ul>
                </div>
                <div className='repeated-block'>
                <ul className='d-flex flex-column gap-4'>
                <li>Carry Overs</li>
                <li>(From last week)</li>
                <li>0 / 0</li>
                 <li>Completed</li>
                 </ul>
                </div>
            </article>
            </section>
            {/*accordion*/}
 <article class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      <ul className='d-flex flex-column'>
        <li><h5>Module1</h5></li>
        <li>Week 1 - Dynamic websites and organizing JavaScript code</li>
        <li>status: In progress</li>
         </ul>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
    {/*table*/}
    <table>
      <thead>
        <tr>
          <th>Module</th>
          <th>Block</th>
          <th>Day</th>
          <th>Task</th>
          <th>Time</th>
          <th>Collaboration</th>
        </tr>
      </thead>
      <tbody>
        {works.map(module => (
          Object.entries(module).map(([moduleName, blocks]) => (
            blocks.map(block => (
              Object.entries(block).map(([blockName, tasks]) => (
                tasks.map(task => (
                  <tr key={`${moduleName}-${blockName}-${task.day}`}>
                    <td>{moduleName}</td>
                    <td>{blockName}</td>
                    <td>{task.day}</td>
                    <td>{task.task}</td>
                    <td>{task.time}</td>
                    <td>{task.Collaboration}</td>
                  </tr>
                ))
              ))
            ))
          ))
        ))}
      </tbody>
    </table>
      </div>
    </div>
  </div>
  </article>
  <div>
      {works.map((module, moduleIndex) => (
        <section key={`module-${moduleIndex}`}>
          <h2>{`Module ${moduleIndex + 1}`}</h2>
          {Object.entries(module).map(([blockName, blockItems]) => (
            <div key={`module-${moduleIndex}-block-${blockName}`}>
              <button onClick={() => setActiveAccordion(blockName)}>
                {blockName}
              </button>
              {activeAccordion === blockName && (
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Task</th>
                      <th>Time</th>
                      <th>Collaboration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockItems.map((blockItem, blockItemIndex) => (
                      <tr key={`module-${moduleIndex}-block-${blockName}-item-${blockItemIndex}`}>
                        <td>{blockItem.day}</td>
                        <td>{blockItem.task}</td>
                        <td>{blockItem.time}</td>
                        <td>{blockItem.Collaboration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
 </section>

                  {/*Attendance section */}
                <section className='attendance'></section>
            </main>
        </div>
    );
}

export default Student;
