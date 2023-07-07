import { useState, useEffect } from 'react'

function Home() {
  const [studentRequests, setStudentRequests] = useState(JSON.parse(localStorage.getItem('studentRequests')) || []);
  const [reviewCount, setReviewCount] = useState(parseInt(localStorage.getItem('reviewCount'), 10) || 5);
  const [click, setClick] = useState(false);
  const [tasks, settask] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [status, setStatus] = useState('Request a review');
  const [showPopup, setShowPopup] = useState(false); // new state variable to track popup display
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []); // new state variable to hold the list of registered users

  const works = [
       {module1:[{block1:[
        {
          day:"day1",
          task: "mapping",
          time: "0.5",
          Collaboration:"solo"
        },
        {
          day:"day2",
          task: "mapping",
          time: "0.5",
          Collaboration:"solo"
        }
      ]},

      {block2:[
        {
          day:"day1",
          task: "mapping",
          time: "0.5",
          Collaboration:"solo"
        },
        {
          day:"day2",
          task: "mapping",
          time: "0.5",
          Collaboration:"solo"
        }
      ]},
    ]},

    {module2:[{block1:[
      {
        day:"day1",
        task: "mapping",
        time: "0.5",
        Collaboration:"solo"
      },
      {
        day:"day2",
        task: "mapping",
        time: "0.5",
        Collaboration:"solo"
      }
    ]},

    {block2:[
      {
        day:"day1",
        task: "mapping",
        time: "0.5",
        Collaboration:"solo"
      },
      {
        day:"day2",
        task: "mapping",
        time: "0.5",
        Collaboration:"solo"
      }
    ]},
  ]}

  ]

  useEffect(() => {
    localStorage.setItem('studentRequests', JSON.stringify(studentRequests));
  }, [studentRequests]);

  useEffect(() => {
    localStorage.setItem('reviewCount', reviewCount);
  }, [reviewCount]);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users)); // add a new useEffect hook to store the list of users in the local storage
  }, [users]);

  const approved = () => {
    setStatus('Submit');
  };

  const requiredChanges = () => {
    setStatus('Required Changes');
    setClick(false);
  };

  const request = () => {
    if (reviewCount === 0) {
      setStatus('You have exhausted all your reviews');
    } else {
      const id = Math.floor(Math.random() * 1000);
      const student = { name: 'Rose', task: 'Mapping', id: id, reviewNum: reviewCount };
      setStudentRequests([...studentRequests, student]);
      setReviewCount(reviewCount - 1);
      setClick(true);
      setStatus('Pending');
    }
  };

  const handleAddTaskClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const taskName = event.target.elements.taskName.value;
    console.log(taskName)
    const id = Math.floor(Math.random() * 1000);
    const task = { name: taskName, id: id };
    // Add task to student dashboard
    settask([...tasks, task]);
    setStatus('Request review');
    setShowPopup(false);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const role = event.target.elements.role.value;
    const id = Math.floor(Math.random() * 1000);
    const user = { name: name, role: role, id: id };
    setUsers([...users, user]); // add the new user to the list of registered users
    event.target.reset();
  };

  return (
    <div className="App">
      <section className='student'><br/><br/>
        <h1>Student Dashboard</h1>
        <span>Task: {tasks.map((item)=> item.name).join(', ')}</span><br/>
        <span>{reviewCount}</span><br/>
        <span>{status}</span><br/>
        <span>{!click ? <button  onClick={request}>Request</button> : <a href='#link'>View Submission</a>}</span>
      </section>
      <section className='reviewer'><br/><br/>
        <h1>Review Dashboard</h1>
        <span>Reviews: {studentRequests.map((request) => request.name).join(', ')}</span><br/>
        <button onClick={approved}>Approved</button><br/>
        <button onClick={requiredChanges}>Required Changes</button>
      </section>
      <section>
        <h1>Admin Dashboard</h1>
        <div>
          <h1>Register</h1>
          <form onSubmit={handleRegisterSubmit}> {/* wrap the inputs in a form */}
            <input name='name' type='text' placeholder='name'/>
            <select name="role">
              <option></option>
              <option value="student">Student</option>
              <option value="reviewer">Code Reviewer</option>
            </select>
            <button type='submit'>submit</button>
          </form>
        </div>
        <div>
          <h1>Users</h1>
          {users.map((user) => (
        <li key={user.id}>{user.name} - {user.role}</li>
      ))}
        </div>
        <div>
          <h1>Shedule weekly Task</h1>
          <button onClick={handleAddTaskClick}>Add</button>
        </div>
        {/* Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={handlePopupClose}>X</button>
              <h2>Add Task</h2>
              <form onSubmit={handleTaskSubmit}>
                <label>
                  Task Name:
                  <input name="taskName" type="text" required/>
                </label>
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        )}
      </section>
      <div>
      {works.map((module, index) => (
        <div key={index}>
          {Object.keys(module).map((key) => (
            <div key={key}>
              {module[key].map((block, index) => (
                <div key={index}>
                  {Object.keys(block).map((blockKey) => (
                    <div key={blockKey}>
                      {block[blockKey].map((item, index) => (
                        <div key={index}>
                          <p>Day: {item.day}</p>
                          <p>Task: {item.task}</p>
                          <p>Time: {item.time}</p>
                          <p>Collaboration: {item.Collaboration}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  );
}

export default Home;