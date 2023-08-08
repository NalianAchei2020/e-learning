import { StoreProvider } from './Context/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequestReviewForm from './pages/studentDashboad.js/Progress_section/requestReviewForm';
import Student from './pages/studentDashboad.js/student';
import './sass/index.scss';
import Admin from './pages/admin/admin';
import Login from './pages/Login';
import Home from './pages/CodeReviewer/Home';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/progress-section-link" element={<Student />} />
            <Route path="/attendance-section-link" element={<Student />} />
            <Route path="/refer-section-link" element={<Student />} />
            <Route path="/reviewerdashboard" element={<Home />} />
            <Route path="/reviewcode" element={<Home />} />
            <Route path="/requestReviewForm" element={<RequestReviewForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Admin />} />
            <Route path="//adminusers" element={<Admin />} />
            <Route path="//pairstudent" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
