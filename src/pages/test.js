import { useContext, useEffect } from "react";
import {StoreContext} from '../Context/store'

function Test() {
    const {state, dispatch} = useContext(StoreContext);
  
    const { studentRequests, reviewCount, click, status,  users } = state;
  
    useEffect(() => {
      localStorage.setItem('studentRequests', JSON.stringify(studentRequests));
    }, [studentRequests]);
  
    useEffect(() => {
      localStorage.setItem('reviewCount', reviewCount);
    }, [reviewCount]);

    useEffect(() => {
        localStorage.setItem('click', click);
      }, [click]);
  
      
      useEffect(() => {
        localStorage.setItem('status', status);
      }, [status]);
    
  
    const approved = () => {
      dispatch({ type: 'SET_STATUS', payload: 'Submit' });
    };
  
    const requiredChanges = () => {
      dispatch({ type: 'SET_STATUS', payload: 'Required Changes' });
      dispatch({ type: 'SET_CLICK', payload: false });
    };
  
    const request = () => {
      if (reviewCount === 0) {
        dispatch({ type: 'SET_STATUS', payload: 'You have exhausted all your reviews' });
      } else {
        const id = Math.floor(Math.random() * 1000);
        const student = { name: 'Rose', task: 'Mapping', id: id, reviewNum: reviewCount };
        dispatch({ type: 'SET_STUDENT_REQUESTS', payload: [...studentRequests, student] });
        dispatch({ type: 'DECREMENT_REVIEW_COUNT' });
        dispatch({ type: 'SET_CLICK', payload: true });
        dispatch({ type: 'SET_STATUS', payload:' "pending" '});
        console.log(studentRequests)
      }
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const role = event.target.elements.role.value;
        const id = Math.floor(Math.random() * 1000);
        const user = { name: name, role: role, id: id };
        console.log(user);
        dispatch({ type: 'ADD_USER', payload: [...users, user] });
        event.target.reset();
        console.log(users)
      };
  
    return (
        <div className="App">
          <section className='student'><br/><br/>
            <h1>Student Dashboard</h1>
            <span>{reviewCount}</span><br/>
            <span>{status}</span><br/>
            <span>{!click ? <button onClick={request}>Request</button> : <a href='#link'>View Submission</a>}</span>
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
        <button className="btn btn-primary">click</button>
          </section>
        </div>
    );
  }
  
  export default Test;