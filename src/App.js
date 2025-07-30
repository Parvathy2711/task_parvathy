import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Settings from './Settings';
import Receipt from './Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserProfile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/receipt' element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
