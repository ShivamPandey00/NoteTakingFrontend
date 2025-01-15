import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import './App.css';
import Page from './app/login/page';
import { NoteLists } from './components/NoteLists';
import { Layout } from './components/Layout';
import TextEditor from './components/TextEditor/TextEditor';
import { CategoryPage } from './components/CategoryPage';

function App() {
  return (
    <div  className="loginform1"> 
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Page />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/notes" element={<Layout><NoteLists /></Layout>} />
        <Route path="/TextEditor" element={<Layout><TextEditor /></Layout>} />
        <Route path="/category" element={<Layout><CategoryPage /></Layout>} />
      </Routes>
    </Router>
    </div>
    

    // <div>
    //   <NoteLists />
    // </div>
  );
}

export default App;