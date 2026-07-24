import { Routes, Route } from 'react-router-dom';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { NavBar } from './components/NavBar';
import { MyJobsPage } from './pages/MyJobsPage';
import { JobFormPage } from './pages/JobFormPage';
import { ProtectedRoute } from './context/ProtectedRoute';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobSearchPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/jobs/mine" element={<ProtectedRoute><MyJobsPage /></ProtectedRoute>} />
        <Route path="/jobs/new" element={<ProtectedRoute><JobFormPage /></ProtectedRoute>} />
        <Route path="/jobs/:id/edit" element={<ProtectedRoute><JobFormPage /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
