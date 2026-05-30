import { BrowserRouter, Routes, Route } from 'react-router';
import { JobSearchPage } from './pages/JobSearchPage';
import { JobDetailPage } from './pages/JobDetailsPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<JobSearchPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
  );
}

export default App;
