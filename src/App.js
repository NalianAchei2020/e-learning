import { StoreProvider } from './Context/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/test';
import Student from './pages/studentDashboad.js/student';
import './sass/index.scss';
import CodeReviewer from './pages/codeReviewer';
import StudentDashboard from './pages/test2';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/progress-section-link" element={<Student />} />
            <Route path="/attendance-section-link" element={<Student />} />
            <Route path="/codereviewer" element={<CodeReviewer />} />
          </Routes>
        </Router>
        <StudentDashboard />
        <CodeReviewer />
      </StoreProvider>
    </div>
  );
}

export default App;
