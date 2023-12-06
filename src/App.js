import './App.css';
// import Main from './Pages/Main.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
      <Login />
      </div>
      <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
