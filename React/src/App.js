//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainRegLog from './MainRegLog';
import Footer from './Footer';
import RegisteredPage from './RegisteredPage';
import UserRegistration from './UserRegistration';


function App() {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainRegLog />} />
          <Route path="RegisteredPage" element={<RegisteredPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
