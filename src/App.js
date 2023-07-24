import { StoreProvider } from './Context/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestReviewForm from './pages/studentDashboad.js/Progress_section/requestReviewForm';
import Student from './pages/studentDashboad.js/student';
import './sass/index.scss';
import CodeReviewer from './pages/codeReviewer';

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
            <Route path="/requestReviewForm" element={<RequestReviewForm />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
