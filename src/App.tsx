import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

