import { Routes, Route } from 'react-router-dom';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<JobSearchPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;