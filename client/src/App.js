import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

function App() {
  return (

      <Routes>
        {/* user routes */}
        <Route path="/" element={<HomePage />} />
        {/* Showing error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

  );
}

export default App;
